import React from 'react'
import './Transfer.css'

const Transfer = () => (
    <div>
        <form onSubmit={event => event.preventDefault()}>

            <br/><text> Receiver Address</text><br/>
            <input type="text" name="receiverAddress"/>
            <input type="submit" value="Send"/>

        </form>
    </div>
)

export default Transfer