import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

const RegisterUserInput = (props) => {
    return (
        <form>
            <p>Register users subscription count to current Ether address:</p>
            <input placeholder="Youtube username" type="text" onChange={props.setYoutubeUser}/>
            <button onClick={props.registerUser}>Register subscription count</button>
        </form>
    )
}

RegisterUserInput.propTypes = {
    setYoutubeUser: PropTypes.func,
    registerUser: PropTypes.func
}

RegisterUserInput.defaultProps = {
    setYoutubeUser: () => {},
    registerUser: () => {}
}

export default class RegisterUserInputContainer extends Component {

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
        return <RegisterUserInput setYoutubeUser={this.setYoutubeUser} registerUser={this.registerUser} />
    }
}
