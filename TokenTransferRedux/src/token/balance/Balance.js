import React from 'react'
import './Balance.css'
import {connect} from "react-redux"

const Balance = ({balance}) => (
    <div className="balance">
        Address: 938492384f29485j <br/>
        Balance: {balance}
    </div>
)

const mapStateToProps = (state) => ({
    balance: state.balance
})

const BalanceContainer = connect(mapStateToProps)(Balance)

export default BalanceContainer