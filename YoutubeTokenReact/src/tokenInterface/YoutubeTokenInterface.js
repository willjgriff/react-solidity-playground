import React, { Component } from 'react'
import Rx from 'rxjs/Rx'

import getWeb3 from '../utils/getWeb3'
import youtubeTokenBridge from '../YoutubeTokenBridge.js'
import RegisterUserInput from './RegisterUserInput.js'
import RegisterUserDetails from './RegisterUserDetails.js'
import TotalTokensCountContainer from './TotalTokensCount.js'

// TODO: Define propTypes and defaultProps
var YoutubeTokenInterface = (props) => {
    return (
        <div>
            <h1>Youtube Subscription Count Token</h1>
            <RegisterUserInput youtubeTokenObservable={props.youtubeTokenObservable}/>
            <RegisterUserDetails
                tokenUpdatedTrigger={props.tokenUpdatedTrigger}
                youtubeTokenObservable={props.youtubeTokenObservable}
                updateState={() => props.updateState()}
            />
            <TotalTokensCountContainer tokenUpdatedTrigger={props.tokenUpdatedTrigger} />
        </div>
    )
}

export default class YoutubeTokenInterfaceContainer extends Component {

    constructor() {
        super()

        const youtubeTokenObservable = Rx.Observable.fromPromise(getWeb3)
            .map(results => new youtubeTokenBridge(results.web3))
            // Not great vvvvv
            .do(null, error => console.log(error))
            .shareReplay(1)

        const tokenUpdatedTrigger = new Rx.Subject()
            .flatMap(trigger => youtubeTokenObservable)
            .shareReplay(1)

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
                updateState={() => this.updateState()}
            />
        )
    }
}
