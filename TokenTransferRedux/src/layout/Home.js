import React from 'react'
import './Home.css'
import Transfer from "../token/transfer/Transfer"
import Balance from "../token/balance/Balance"
import {setBalance} from "../token/balance/Reducers"
import {createStore} from "redux"
import {Provider} from "react-redux"

const store = createStore(setBalance)

export default () => (
    <Provider store={store}>
        <div className="home">
            Transfer coins to another account
            <Balance/>
            <Transfer/>
        </div>
    </Provider>
)