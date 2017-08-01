import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import youtubeToken from './youtubeTokenCommands.js'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

// TODO: Best practice suggests splitting each of these components into stateful (containers) and stateless (views) for
// more modularity. I won't bother for now though, these components seem small enough and I'm not doing any testing.

class RegisterUserInput extends Component {

    state = { inputYoutubeUser: "" }

    // Note that 'defaultProps' seems pointless here, maybe I'm missing something though
    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable)
    }

    registerUser = () => {
        this.props.youtubeTokenObservable
            .flatMap(youtubeToken => youtubeToken.addUserSubscriptionCount(this.state.inputYoutubeUser))
            .subscribe()
    }

    setYoutubeUser = (event) => {
        this.setState({ inputYoutubeUser: event.target.value })
    }

    render() {
        return (
            <label>
                <p>Register user:</p>
                <input placeholder="Youtube username" type="text" onChange={this.setYoutubeUser}/>
                <button onClick={this.registerUser}>Register subscription count</button>
            </label>
        )
    }
}

// TODO: Needs breaking down, fine for now.
class RegisterUserDetails extends Component {

    state = {
        oraclizeQuery: "",
        oraclizeFee: "",
        updatedUser: "",
        updatedSubscriptionCount: "",
        accountUpdated: "",
        accountBalance: ""
    }

    // Remember to do these.
    static propTypes = {}

    static defaultProps = {}

    componentWillMount() {
        this.updateOraclizeCost()

        this.props.youtubeTokenObservable
            .flatMap(youtubeToken => youtubeToken.debugOraclizeQuery())
            .subscribe(logResponse => this.setState({ oraclizeQuery: logResponse.args.query }))

        this.props.youtubeTokenObservable
            .flatMap(youtubeToken => youtubeToken.logSubscriptionCountUpdated())
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
            .flatMap(youtubeToken => youtubeToken.getOraclizeCost())
            .subscribe(oraclizeFee => this.setState({ oraclizeFee: oraclizeFee }))
    }

    updateBalance() {
        this.props.tokenUpdatedTrigger
            .map(youtubeToken => youtubeToken.getCoinbase())
            .flatMap(account => this.props.youtubeTokenObservable
                .flatMap(youtubeToken => youtubeToken.getBalanceOf(account)))
            .subscribe(balance => this.setState({ accountUpdated: balance.account, accountBalance: balance.balance }))
    }

    render() {
        return (
            <div>
                <RegisterUserInput youtubeTokenObservable={this.props.youtubeTokenObservable}/>
                <p>&nbsp;&nbsp;&nbsp;Oraclize query: {this.state.oraclizeQuery}</p>
                <p>&nbsp;&nbsp;&nbsp;Oraclize query cost: {this.state.oraclizeFee}</p>
                <p>&nbsp;&nbsp;&nbsp;User updated: {this.state.updatedUser} Subscription count: {this.state.updatedSubscriptionCount}</p>
                <p>&nbsp;&nbsp;&nbsp;Updated account: {this.state.accountUpdated} Balance: {this.state.accountBalance}</p>
            </div>
        )
    }
}

class TokenCount extends Component {

    state = { totalTokens: 0 }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeToken => youtubeToken.getTotalYoutubeTokens())
            .subscribe(totalTokens => this.setState({ totalTokens: totalTokens }))
    }

    render() {
        return (<p>Total Youtube Tokens: {this.state.totalTokens}</p>)
    }
}

export default class App extends Component {

    constructor() {
        super()

        const youtubeTokenObservable = Rx.Observable.fromPromise(getWeb3)
            .map(results => new youtubeToken(results.web3))
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
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="#" className="pure-menu-heading pure-menu-link">Basic Contract Interface</a>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <h1>Youtube Subscription Count Token</h1>
                            <RegisterUserDetails
                                tokenUpdatedTrigger={this.state.tokenUpdatedTrigger}
                                youtubeTokenObservable={this.state.youtubeTokenObservable}
                                updateState={() => this.updateState()}
                            />
                            <TokenCount tokenUpdatedTrigger={this.state.tokenUpdatedTrigger} />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
