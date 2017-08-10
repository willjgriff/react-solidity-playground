import {applyMiddleware, compose, createStore} from "redux"
import {createEpicMiddleware} from "redux-observable"
import {logger} from "redux-logger"
import {rootEpic, rootReducer} from "./root"
import TokenBridge from "../web3/TokenBridge"
import getWeb3 from "../web3/getWeb3"
import * as Rx from "rxjs"
import Web3Bridge from "../web3/Web3Bridge"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create dependency streams, not sure where the best place is to instantiate these.
const web3$ = Rx.Observable.fromPromise(getWeb3).shareReplay(1)
const tokenBridge$ = web3$.flatMap(web3 => new TokenBridge(web3)).shareReplay(1)
const web3Bridge$ = web3$.flatMap(web3 => new Web3Bridge(web3)).shareReplay(1)

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {web3$, tokenBridge$, web3Bridge$}
})

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware,
            logger
        )
    )
)

export default store