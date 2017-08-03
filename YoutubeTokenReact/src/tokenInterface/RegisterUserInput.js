import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import './RegisterUserInput.css'

const RegisterUserInput = (props) => {
    return (
        <div className="register-container">

            <form>
                <p>Register users subscription count to current Ether address:</p>
                <div className="register-input-container">
                    <input placeholder="Youtube username" type="text" onChange={props.setYoutubeUser}/>
                    <button className="register-input-button" onClick={props.registerUser}>Register subscription count</button>
                </div>

                {props.isLoading ?
                <div className="loader"/>
                : null}
            </form>

        </div>
    )
}

RegisterUserInput.propTypes = {
    setYoutubeUser: PropTypes.func,
    registerUser: PropTypes.func,
    isLoading: PropTypes.bool
}

RegisterUserInput.defaultProps = {
    setYoutubeUser: () => {},
    registerUser: () => {},
    isLoading: false
}

export default class RegisterUserInputContainer extends Component {

    state = {
        inputYoutubeUser: "",
        isLoading: false
     }

    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
    }

    registerUser = () => {
        this.setState({ isLoading: true })

        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.addUserSubscriptionCount(this.state.inputYoutubeUser))
            .subscribe(null, error => {
                this.setState({ isLoading: false});
                console.log(error)
            })

        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.LogFutureSubscriptionCountUpdated())
            .subscribe(() => this.setState({ isLoading: false}),
                error => {
                    console.log(error)
                    this.setState({ isLoading: false })
                }
            )
    }

    setYoutubeUser = (event) => {
        this.setState({ inputYoutubeUser: event.target.value })
    }

    render() {
        return (
            <RegisterUserInput
                setYoutubeUser={this.setYoutubeUser}
                registerUser={this.registerUser}
                isLoading={this.state.isLoading}
            />
        )
    }
}
