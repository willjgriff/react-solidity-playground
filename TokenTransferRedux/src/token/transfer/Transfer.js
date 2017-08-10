import React from 'react'
import './Transfer.css'
import {connect} from "react-redux"
import {setBalance} from "../balance/BalanceActions"

const Transfer = ({onSubmitClicked}) => (
    <div>
        <form onSubmit={event => onSubmitClicked(event)}>
            <br/>
            <text> Receiver Address</text>
            <br/>
            <input type="number" id="newBalance"/>
            <input type="submit" value="Send"/>
        </form>
    </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onSubmitClicked: (event) => {
        event.preventDefault()
        // dispatch(setBalance(event.target.querySelector('input').balance))
        dispatch(setBalance("ACCOUNT", event.target.newBalance.value))
    }
})

const TransferContainer = connect(mapStateToProps, mapDispatchToProps)(Transfer)

export default TransferContainer