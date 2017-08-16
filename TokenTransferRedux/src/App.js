import React from 'react'
import Home from "./layout/Home.js"
import store from "./redux/store"
import {Provider} from "react-redux"
import {updateAvailableAccounts} from "./token/balance/BalanceActions"
import getWeb3 from "./web3/getWeb3"

// Initialize web3 and set in Redux.
getWeb3
    .then(results => {
        console.log('Web3 initialized!')
        store.dispatch(updateAvailableAccounts())
    })
    .catch(() => {
        console.log('Error in web3 initialization.')
    })

const App = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
)

export default App
