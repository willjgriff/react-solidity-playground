import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import './RegisterUserInput.css'

const RegisterUserInput = (props) => (
    <div>
        <p>Register users subscription count to current Ether address:</p>
        <div className="register-input-container">
            <input placeholder="Youtube username" type="text" onChange={props.setYoutubeUser}/>
            <button className="register-input-button" onClick={props.registerUser}>Register subscription count
            </button>
        </div>

        {props.isLoading ?
            <div className="loader"/>
            : null}

    </div>
)

RegisterUserInput.propTypes = {
    setYoutubeUser: PropTypes.func,
    registerUser: PropTypes.func,
    isLoading: PropTypes.bool
}

RegisterUserInput.defaultProps = {
    setYoutubeUser: () => {
    },
    registerUser: () => {
    },
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
        this.setState({isLoading: true})
        this.submitAndHideLoading()
    }

    submitAndHideLoading() {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.addUserSubscriptionCountWithFailEmission(this.state.inputYoutubeUser)
                .merge(youtubeTokenBridge.logFutureSubscriptionCountUpdated()))
            .subscribe(() => this.setState({isLoading: false}),
                error => {
                    this.setState({isLoading: false})
                    console.log(error)
                })
    }

    setYoutubeUser = (event) => {
        this.setState({inputYoutubeUser: event.target.value})
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
