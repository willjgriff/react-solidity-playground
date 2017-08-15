import React from 'react'
import './Token.css'
import Transfer from "../token/transfer/Transfer"
import Balance from "../token/balance/Balance"
import {connect} from "react-redux"

const Token = () => {
    return (
        <div className="home">
            <Balance/>
            <br/>
            <Transfer/>
        </div>
    )
}

export default connect()(Token)