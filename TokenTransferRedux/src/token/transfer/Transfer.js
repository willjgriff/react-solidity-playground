import React from 'react'
import './Transfer.css'
import {connect} from "react-redux"
import {transferFunds} from "./TransferActions"

const Transfer = ({onSubmitClicked, isLoading}) => (
    <div>
        <form onSubmit={event => onSubmitClicked(event)}>
            <p>Transfer to another account</p>
            <input type="string" id="address" placeholder="Address"/>
            <br/>
            <input type="number" id="value" placeholder="Value"/>
            <br/>
            <input type="submit" value="Transfer"/>
            <br/>
            {isLoading ?
                <div className="loader"/>
                : null}
        </form>
    </div>
)

const mapStateToProps = state => ({
    isLoading: state.accountBalance.loading
})

const mapDispatchToProps = dispatch => ({
    onSubmitClicked: (event) => {
        event.preventDefault()
        dispatch(transferFunds(event.target.address.value, event.target.value.value))
    }
})

const TransferContainer = connect(mapStateToProps, mapDispatchToProps)(Transfer)

export default TransferContainer