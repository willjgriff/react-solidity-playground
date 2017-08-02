import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

export default class RegisteredUserDetails extends Component {

    state = {
        updatedUser: "",
        updatedSubscriptionCount: ""
    }

    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
        updateState: PropTypes.func
    }

    static defaultProps = {
        updateState: () => {}
    }

    componentWillMount() {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.logSubscriptionCountUpdated())
            .subscribe(logResponse => {
                this.props.updateState()
                this.setState({
                    updatedUser: logResponse.args.subscriber,
                    updatedSubscriptionCount: logResponse.args.subscriptionCount.toNumber()
                })
            })
    }

    render() {
        return (
            <div>
                <p>&nbsp;&nbsp;&nbsp;User registered: {this.state.updatedUser}
                <br/>&nbsp;&nbsp;&nbsp;Subscription count: {this.state.updatedSubscriptionCount}</p>
            </div>
        )
    }
}
