import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import youtubeToken from './youtubeTokenCommands.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            youtubeToken: null,

            inputYoutubeUser: "",
            oraclizeQuery: "",
            oraclizeFee: "",

            updatedUser: "",
            updatedSubscriptionCount: "",

            account: "",
            accBalance: "",
            totalTokens: ""
        }

        this.registerUser = this.registerUser.bind(this)
        this.setYoutubeUser = this.setYoutubeUser.bind(this)
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({ web3: results.web3, youtubeToken: new youtubeToken(results.web3) })
            this.loadContractStateIntoView()
        }).catch(error => {
            console.log(error)
        })
    }

    loadContractStateIntoView() {
        // TODO: Should really create a trigger for these (using el flatmapo)
        this.updateBalance()
        this.updateOraclizeCost()
        this.updateTotalTokens()

        this.state.youtubeToken.debugOraclizeQuery()
            .subscribe(logResponse => this.setState({ oraclizeQuery: logResponse.args.query }))

        this.state.youtubeToken.logSubscriptionCountUpdated()
            .subscribe(logResponse => {
                this.updateBalance()
                this.updateOraclizeCost()
                this.updateTotalTokens()
                this.setState({
                    updatedUser: logResponse.args.subscriber,
                    updatedSubscriptionCount: logResponse.args.subscriptionCount.toNumber()
                })
            })
    }

    updateOraclizeCost() {
        this.state.youtubeToken.getOraclizeCost()
            .subscribe(oraclizeFee => this.setState({ oraclizeFee: oraclizeFee }))
    }

    updateBalance() {
        this.state.youtubeToken.getAccounts()
            .take(1)
            .flatMap(account => this.state.youtubeToken.getBalanceOf(account))
            .subscribe(balance => this.setState({ accBalance: balance }))
    }

    updateTotalTokens() {
        this.state.youtubeToken.getTotalYoutubeTokens()
            .subscribe(totalTokens => this.setState({ totalTokens: totalTokens }))
    }

    registerUser() {
        this.state.youtubeToken.getAccounts()
            .take(1)
            // TODO: This is poor, change this
            .do(account => this.setState({ account: account }))
            .flatMap(account => this.state.youtubeToken.addUserSubscriptionCount(this.state.inputYoutubeUser, account))
            .subscribe()
    }

    setYoutubeUser(event) {
        this.setState({ inputYoutubeUser: event.target.value })
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

                            <label>
                                <p>Register user:</p>
                                <input type="text" onChange={this.setYoutubeUser}/>
                                <button onClick={this.registerUser}>Register subcription count</button>
                            </label>

                            <p>&nbsp;&nbsp;&nbsp;Oraclize query: {this.state.oraclizeQuery}</p>
                            <p>&nbsp;&nbsp;&nbsp;Oraclize query cost: {this.state.oraclizeFee}</p>
                            <p>&nbsp;&nbsp;&nbsp;User updated: {this.state.updatedUser} Subscription count: {this.state.updatedSubscriptionCount}</p>

                            <p>Total Youtube Tokens: {this.state.totalTokens}</p>

                            <p>Updated account: {this.state.account} Balance: {this.state.accBalance}</p>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App
