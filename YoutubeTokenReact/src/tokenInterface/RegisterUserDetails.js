import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

// TODO: Should be broken down into smaller components.
export default class RegisterUserDetails extends Component {

    state = {
        oraclizeQuery: "",
        oraclizeFee: "",
        updatedUser: "",
        updatedSubscriptionCount: "",
        accountUpdated: "",
        accountBalance: ""
    }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable),
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
        updateState: PropTypes.func
    }

    static defaultProps = {
        updateState: () => {}
    }

    componentWillMount() {
        this.updateOraclizeCost()

        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.debugOraclizeQuery())
            .subscribe(logResponse => this.setState({ oraclizeQuery: logResponse.args.query }))

        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.logSubscriptionCountUpdated())
            .subscribe(logResponse => {
                this.updateOraclizeCost()
                this.updateBalance()
                this.props.updateState()
                this.setState({
                    updatedUser: logResponse.args.subscriber,
                    updatedSubscriptionCount: logResponse.args.subscriptionCount.toNumber()
                })
            })
    }

    updateOraclizeCost() {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getOraclizeCost())
            .subscribe(oraclizeFee => this.setState({ oraclizeFee: oraclizeFee }))
    }

    updateBalance() {
        this.props.tokenUpdatedTrigger
            .map(youtubeTokenBridge => youtubeTokenBridge.getCoinbase())
            .flatMap(account => this.props.youtubeTokenObservable
                .flatMap(youtubeTokenBridge => youtubeTokenBridge.getBalanceOf(account)))
            .subscribe(balance => this.setState({ accountUpdated: balance.account, accountBalance: balance.balance }))
    }

    render() {
        return (
            <div>
                <p>&nbsp;&nbsp;&nbsp;Oraclize query: {this.state.oraclizeQuery}
                <br/>&nbsp;&nbsp;&nbsp;Oraclize query cost: {this.state.oraclizeFee}</p>

                <p>&nbsp;&nbsp;&nbsp;User registered: {this.state.updatedUser}
                <br/>&nbsp;&nbsp;&nbsp;Subscription count: {this.state.updatedSubscriptionCount}</p>

                <p>&nbsp;&nbsp;&nbsp;Updated account: {this.state.accountUpdated}
                <br/>&nbsp;&nbsp;&nbsp;Account balance: {this.state.accountBalance}</p>
            </div>
        )
    }
}
