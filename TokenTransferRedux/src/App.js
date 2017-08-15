import React from 'react'
import Home from "./layout/Home.js"
import store from "./redux/store"
import {Provider} from "react-redux"
import {updateAvailableAccounts, updateBalance} from "./token/balance/BalanceActions"

// TODO: Where's the best place to put these?
store.dispatch(updateBalance())
store.dispatch(updateAvailableAccounts())

const App = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
)

export default App
