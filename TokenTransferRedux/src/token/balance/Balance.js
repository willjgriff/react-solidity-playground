import React from 'react'
import './Balance.css'
import {connect} from "react-redux"
import {updateBalance} from "./BalanceActions"

const Balance = ({accounts, balance, onAccountSelected}) => {

    const accountOptions = accounts.map(account =>
        <option key={account} value={account}>{account}</option>
    )

    return (
        <div className="balance-box">
            <h2>Balance of account</h2>
                <form className="pure-form">
                    <select onChange={event => onAccountSelected(event)}>
                        {accountOptions}
                    </select>
            <h4 className="balance-text">Balance: {balance}</h4>
                </form>
        </div>
    )
}

const mapStateToProps = state => ({
    account: state.selectedAccount.account,
    accounts: state.availableAccounts,
    balance: state.selectedAccount.balance
})

const mapDispatchToProps = dispatch => ({
    onAccountSelected: event => {
        dispatch(updateBalance(event.target.value))
    }
})

const BalanceContainer = connect(mapStateToProps, mapDispatchToProps)(Balance)

export default BalanceContainer