import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

const AccountDetails = (props) => {
    return (
        <div>
            <p>&nbsp;&nbsp;&nbsp;Updated account: {props.accountUpdated}
            <br/>&nbsp;&nbsp;&nbsp;Account balance: {props.accountBalance}</p>
        </div>
    )
}

AccountDetails.propTypes = {
    accountUpdated: PropTypes.string,
    accountBalance: PropTypes.number
}

AccountDetails.defaultProps = {
    accountUpdated: "~~~",
    accountBalance: 0
}

export default class AccountDetailsContainer extends Component {

    state = {
        accountUpdated: "~~~",
        accountBalance: 0
    }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getBalanceOfCoinbase())
            .subscribe(balance => this.setState({ accountUpdated: balance.account, accountBalance: balance.balance }),
                error => console.log(error))
    }

    render() {
        return (
            <AccountDetails accountUpdated={this.state.accountUpdated} accountBalance={this.state.accountBalance} />
        )
    }
}
