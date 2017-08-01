import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

// TODO: Should have container component
export default class RegisterUserInput extends Component {

    state = { inputYoutubeUser: "" }

    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable)
    }

    registerUser = () => {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.addUserSubscriptionCount(this.state.inputYoutubeUser))
            .subscribe()
    }

    setYoutubeUser = (event) => {
        this.setState({ inputYoutubeUser: event.target.value })
    }

    render() {
        return (
            <label>
                <p>Register users subscription count to current Ether address:</p>
                <input placeholder="Youtube username" type="text" onChange={this.setYoutubeUser}/>
                <button onClick={this.registerUser}>Register subscription count</button>
            </label>
        )
    }
}
