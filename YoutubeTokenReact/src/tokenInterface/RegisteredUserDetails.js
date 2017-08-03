import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

var RegisteredUserDetails = (props) => {
    return (
        <div>
            <p>&nbsp;&nbsp;&nbsp;User registered (from count updated event): {props.updatedUser}
            <br/>&nbsp;&nbsp;&nbsp;Subscription count (from count updated event): {props.updatedSubscriptionCount}</p>
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
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.logSubscriptionCountUpdated())
            .subscribe(logResponse => {
                this.setState({
                    updatedUser: logResponse.args.subscriber,
                    updatedSubscriptionCount: logResponse.args.subscriptionCount.toNumber()
                })
            })
    }

    render() {
        return (<RegisteredUserDetails
                updatedUser={this.state.updatedUser}
                updatedSubscriptionCount={this.state.updatedSubscriptionCount}
            />)
    }
}
