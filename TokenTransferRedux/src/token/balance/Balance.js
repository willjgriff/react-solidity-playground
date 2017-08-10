import React from 'react'
import './Balance.css'
import {connect} from "react-redux"

const Balance = ({account, balance}) => (
    <div className="balance">

        Address: {account}
        <br/>
        Balance: {balance}

    </div>
)

const mapStateToProps = (state) => ({
    account: state.account,
    balance: state.balance
})

const BalanceContainer = connect(mapStateToProps)(Balance)

export default BalanceContainer