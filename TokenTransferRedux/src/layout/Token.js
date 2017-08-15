import React from 'react'
import './Token.css'
import Transfer from "../token/transfer/Transfer"
import Balance from "../token/balance/Balance"
import {updateBalance} from "../token/balance/BalanceActions"
import {connect} from "react-redux"

const Token = ({dispatch}) => {

    dispatch(updateBalance())

    return (
        <div className="home">
            <Balance/>
            <br/>
            <Transfer/>
        </div>
    )
}

export default connect()(Token)