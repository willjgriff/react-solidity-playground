import React from 'react'
import Home from "./layout/Home.js"
import store from "./redux/store"
import {Provider} from "react-redux"
import {updateAvailableAccounts} from "./token/balance/BalanceActions"
import getWeb3 from "./web3/getWeb3"
import {ConnectedRouter} from "react-router-redux"
import createHistory from "history/createBrowserHistory"

// Initialize web3 and set in Redux.
getWeb3
    .then(results => {
        console.log('Web3 initialized!')
        store.dispatch(updateAvailableAccounts())
    })
    .catch(() => {
        console.log('Error in web3 initialization.')
    })

const history = createHistory()

// TODO: react-router-redux v5-alpha needed for react-router v4. So for now we can't get time travel between changing pages.
// DevTools doesn't work with rpc calls yet anyway.
const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <Home/>
        </ConnectedRouter>
    </Provider>
)

export default App
