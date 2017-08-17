import React from 'react'
import './Transfer.css'
import {connect} from "react-redux"
import {transferFunds} from "./TransferActions"

const Transfer = ({onSubmitClicked, isLoading}) => (
    <div className="form-box">
        <h2>Transfer to</h2>

        <form className="pure-form" onSubmit={event => onSubmitClicked(event)}>
            <input type="text" id="address" placeholder="Address" className="transfer-address"/>
            <input type="number" id="value" placeholder="Value" required/>
            <button type="submit" className="pure-button" disabled={isLoading}>Submit</button>
            {isLoading ?
                <div className="loader"/>
                : null}
        </form>
    </div>
)

const mapStateToProps = state => ({
    isLoading: state.transfer.loading
})

const mapDispatchToProps = dispatch => ({
    onSubmitClicked: (event) => {
        event.preventDefault()
        dispatch(transferFunds(event.target.address.value, event.target.value.value))
    }
})

const TransferContainer = connect(mapStateToProps, mapDispatchToProps)(Transfer)

export default TransferContainer