import {applyMiddleware, compose, createStore} from "redux"
import {createEpicMiddleware} from "redux-observable"
import {logger} from "redux-logger"
import {rootEpic, rootReducer} from "./root"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware(rootEpic)

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