import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import youtubeTokenBridge from './YoutubeTokenBridge.js'
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

    static propTypes = {
        youtubeTokenObservable: PropTypes.instanceOf(Rx.Observable)
    }

    registerUser = () => {
        this.props.youtubeTokenObservable
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.addUserSubscriptionCount(this.state.inputYoutubeUser))
            .subscribe()
    }

    setYoutubeUser = (event) => {
        this.setState({ inputYoutubeUser: event.target.value })
    }

    render() {
        return (
            <label>
                <p>Register users subscription count to current Ether address:</p>
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

var TotalTokensCount = (props) => {
    return (<p>Total Youtube Tokens: {props.totalTokens}</p>)
}

class TotalTokensCountContainer extends Component {

    state = { totalTokens: 0 }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getTotalYoutubeTokens())
            .subscribe(totalTokens => this.setState({ totalTokens: totalTokens }))
    }

    render() {
        return (<TotalTokensCount totalTokens={this.state.totalTokens} />)
    }
}

class YoutubeTokenInterface extends Component {

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
            <div>
                <h1>Youtube Subscription Count Token</h1>
                <RegisterUserInput youtubeTokenObservable={this.state.youtubeTokenObservable}/>
                <RegisterUserDetails
                    tokenUpdatedTrigger={this.state.tokenUpdatedTrigger}
                    youtubeTokenObservable={this.state.youtubeTokenObservable}
                    updateState={() => this.updateState()}
                />
                <TotalTokensCountContainer tokenUpdatedTrigger={this.state.tokenUpdatedTrigger} />
            </div>
        )
    }
}

// export default class App extends Component {
export default () => {
    return (
        <div className="App">
            <nav className="navbar pure-menu pure-menu-horizontal">
                <a href="#" className="pure-menu-heading pure-menu-link">Basic Contract Interface</a>
            </nav>

            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <YoutubeTokenInterface />
                    </div>
                </div>
            </main>
        </div>
    );
}
