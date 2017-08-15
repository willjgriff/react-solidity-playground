import React from 'react'
import './Balance.css'
import {connect} from "react-redux"

const Balance = ({account, accounts, balance}) => {

    const accountOptions = accounts.map(account =>
        <option>{account}</option>
    )

    return (
        <div className="balance">
            Balance of account
            <br/>
            Address:
            <select>
                {accountOptions}
            </select>
            <br/>
            Address: {account}
            <br/>
            Balance: {balance}
        </div>
    )
}

const mapStateToProps = state => ({
    account: state.accountBalance.account,
    accounts: state.availableAccounts,
    balance: state.accountBalance.balance
})

const mapDispatchToProps = dispatch => ({
    onAccountSelected: dispatch(/** something */)
})

const BalanceContainer = connect(mapStateToProps, mapDispatchToProps)(Balance)

export default BalanceContainer