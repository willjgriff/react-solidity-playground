import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

export default class AccountDetails extends Component {

    state = {
        accountUpdated: "",
        accountBalance: ""
    }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getBalanceOf(youtubeTokenBridge.getCoinbase()))
            .subscribe(balance => this.setState({ accountUpdated: balance.account, accountBalance: balance.balance }))
    }

    render() {
        return (
            <div>
                <p>&nbsp;&nbsp;&nbsp;Updated account: {this.state.accountUpdated}
                <br/>&nbsp;&nbsp;&nbsp;Account balance: {this.state.accountBalance}</p>
            </div>
        )
    }
}
