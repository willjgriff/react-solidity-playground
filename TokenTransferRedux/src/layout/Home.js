import React from 'react'
import './Home.css'
import Transfer from "../token/transfer/Transfer"
import Balance from "../token/balance/Balance"

export default () => (
    <div className="home">

        Transfer coins to another account
        <Balance/>
        <Transfer/>

    </div>
)