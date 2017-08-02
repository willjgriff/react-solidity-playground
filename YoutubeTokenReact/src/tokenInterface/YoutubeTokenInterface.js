import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import getWeb3 from '../utils/getWeb3'
import youtubeTokenBridge from '../YoutubeTokenBridge.js'
import RegisterUserInputContainer from './RegisterUserInput.js'
import OraclizeDetails from './OraclizeDetails.js'
import RegisteredUserDetails from './RegisteredUserDetails.js'
import AccountDetails from './AccountDetails.js'
import TotalTokensCountContainer from './TotalTokensCount.js'

var YoutubeTokenInterface = (props) => {
    return (
        <div>
            <h1>Youtube Subscription Count Token</h1>
            <h3>Open console to see feedback of request</h3>

            <RegisterUserInputContainer youtubeTokenObservable={props.youtubeTokenObservable}/>

            <OraclizeDetails tokenUpdatedTrigger={props.tokenUpdatedTrigger} />
            <RegisteredUserDetails youtubeTokenObservable={props.youtubeTokenObservable} updateState={props.updateState} />
            <AccountDetails tokenUpdatedTrigger={props.tokenUpdatedTrigger} />

            <TotalTokensCountContainer tokenUpdatedTrigger={props.tokenUpdatedTrigger} />
        </div>
    )
}

YoutubeTokenInterface.propTypes = {
    youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable),
    tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable),
    updateState: PropTypes.func
}

YoutubeTokenInterface.defaultProps = {
    updateState: () => {}
}

export default class YoutubeTokenInterfaceContainer extends Component {

    constructor() {
        super()

        const youtubeTokenObservable = Rx.Observable.fromPromise(getWeb3)
            .map(results => new youtubeTokenBridge(results.web3))
            // Not great vvvvv
            .do(() => console.log("Emitted youtubeTokenBridge"), error => console.log(error))
            .shareReplay(1)

        const tokenUpdatedTrigger = new Rx.ReplaySubject(1)
            .flatMap(trigger => youtubeTokenObservable)

        this.state = {
            youtubeTokenObservable: youtubeTokenObservable,
            tokenUpdatedTrigger: tokenUpdatedTrigger,
        }
    }

    componentWillMount() {
        this.updateState()
    }

    updateState = () => {
        this.state.tokenUpdatedTrigger.next(true)
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
