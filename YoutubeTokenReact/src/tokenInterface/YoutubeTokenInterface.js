import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import getWeb3 from '../utils/getWeb3'
import youtubeTokenBridge from '../YoutubeTokenBridge.js'
import RegisterUserInputContainer from './RegisterUserInput.js'
import OraclizeDetailsContainer from './OraclizeDetails.js'
import RegisteredUserDetailsContainer from './RegisteredUserDetails.js'
import AccountDetailsContainer from './AccountDetails.js'
import TotalTokensCountContainer from './TotalTokensCount.js'

var YoutubeTokenInterface = (props) => {
    return (
        <div>
            <h1>Youtube Subscription Count Token</h1>
            <h3>Open console to see feedback of request</h3>

            <RegisterUserInputContainer youtubeTokenObservable={props.youtubeTokenObservable}/>

            <OraclizeDetailsContainer tokenUpdatedTrigger={props.tokenUpdatedTrigger} />
            <RegisteredUserDetailsContainer youtubeTokenObservable={props.youtubeTokenObservable}/>
            <AccountDetailsContainer tokenUpdatedTrigger={props.tokenUpdatedTrigger} />

            <TotalTokensCountContainer tokenUpdatedTrigger={props.tokenUpdatedTrigger} />
        </div>
    )
}

YoutubeTokenInterface.propTypes = {
    youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
    tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable),
}

YoutubeTokenInterface.defaultProps = {
    updateState: () => {}
}

export default class YoutubeTokenInterfaceContainer extends Component {

    constructor() {
        super()

        const youtubeTokenObservable = Rx.Observable.fromPromise(getWeb3)
            .map(results => new youtubeTokenBridge(results.web3))
            // TODO Consumption of error is poor. Put in individual subscriptions.
            .do(null, error => console.log(error))
            .shareReplay(1)

        const tokenUpdatedTrigger = youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.logSubscriptionCountUpdated())
            // Start with an empty object to prompt loading of initial state before any contract updates have occured.
            .startWith({})
            .flatMap(trigger => youtubeTokenObservable)
            .shareReplay(1)

        this.state = {
            youtubeTokenObservable,
            tokenUpdatedTrigger
        }
    }

    render() {
        return (
            <YoutubeTokenInterface
                youtubeTokenObservable={this.state.youtubeTokenObservable}
                tokenUpdatedTrigger={this.state.tokenUpdatedTrigger}
                updateState={this.updateState}
            />
        )
    }
}