import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

var RegisteredUserDetails = (props) => {
    return (
        <div>
            <p>&nbsp;&nbsp;&nbsp;User registered (from registered updated event): {props.updatedUser}
            <br/>&nbsp;&nbsp;&nbsp;Subscription count (from registered updated event): {props.updatedSubscriptionCount}</p>
        </div>
    )
}

RegisteredUserDetails.propTypes = {
    updatedUser: PropTypes.string,
    updatedSubscriptionCount: PropTypes.number
}

RegisteredUserDetails.defaultProps = {
    updatedUser: "~~~",
    updatedSubscriptionCount: 0
}

export default class RegisteredUserDetailsContainer extends Component {

    state = {
        updatedUser: "~~~",
        updatedSubscriptionCount: 0
    }

    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
    }

    componentWillMount() {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.LogFutureSubscriptionCountUpdated())
            .subscribe(logResponse => {
                this.setState({
                    updatedUser: logResponse.args.subscriber,
                    updatedSubscriptionCount: logResponse.args.subscriptionCount.toNumber()
                })
            }, error => console.log(error))
    }

    render() {
        return (<RegisteredUserDetails
                updatedUser={this.state.updatedUser}
                updatedSubscriptionCount={this.state.updatedSubscriptionCount}
            />)
    }
}
