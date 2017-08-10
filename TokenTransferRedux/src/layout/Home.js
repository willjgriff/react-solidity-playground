import React from 'react'
import './Home.css'
import Transfer from "../token/transfer/Transfer"
import Balance from "../token/balance/Balance"
import {Provider} from "react-redux"
import store from "../redux/store"
import {showBalance} from "../token/balance/BalanceActions"

// TODO: Move initial fetches somewhere more suitable.

store.dispatch(showBalance())

export default () => (
    <Provider store={store}>
        <div className="home">
            Transfer coins to another account
            <Balance/>
            <Transfer/>
        </div>
    </Provider>
)