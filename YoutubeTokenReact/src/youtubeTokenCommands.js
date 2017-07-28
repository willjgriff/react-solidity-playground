import YoutubeToken from '../build/contracts/YoutubeToken.json'
import Rx from 'rxjs/Rx'
import BigNumber from 'bignumber.js'

class YoutubeTokenCommands {

    constructor(web3) {
        const contract = require('truffle-contract')
        const youtubeTokenContract = contract(YoutubeToken)
        youtubeTokenContract.setProvider(web3.currentProvider)

        this.web3 = web3
        this.youtubeToken = Rx.Observable
            .fromPromise(youtubeTokenContract.deployed())
            .shareReplay(1)
    }

    getAccounts() {
        return Rx.Observable
            .from(this.web3.eth.accounts)
            .do(account => console.log(account))
    }

    getOraclizeCost() {
        return this.youtubeToken
            .flatMap(youtubeToken => youtubeToken.getOraclizeFee())
            .map(oraclizeFeeBigNumber => oraclizeFeeBigNumber.toNumber())
            .do(oraclizeFee => console.log(oraclizeFee))
    }

    getBalanceOf(account) {
        return this.youtubeToken
            .flatMap(youtubeToken => Rx.Observable.zip(youtubeToken.balanceOf(account), youtubeToken.decimals(),
                (balance, tokenDecimals) => { return { balance: balance, tokenDecimals: tokenDecimals } }))
            .map(zipResult => { zipResult.tokenDecimals = new BigNumber("1.0e+" + zipResult.tokenDecimals); return zipResult })
            .map(editedZipResult => editedZipResult.balance.div(editedZipResult.tokenDecimals))
            .map(balanceBigNumber => balanceBigNumber.toNumber())
            .do(balance => console.log("Account: " + account + " Balance: " + balance))
    }

    getTotalYoutubeTokens() {
        return this.youtubeToken
            .flatMap(youtubeToken => youtubeToken.totalSupply())
            .map(totalSupplyBigNumber => totalSupplyBigNumber.toNumber())
            .do(totalSupply => console.log("Total Supply: " + totalSupply))
    }

    addUserSubscriptionCount(user, account) {
        return this.youtubeToken
            .zip(this.getOraclizeCost(), (youtubeToken, oraclizeCost) => { return { youtubeToken: youtubeToken, oraclizeCost: oraclizeCost } })
            .flatMap(zipResult => zipResult.youtubeToken.registerUser(user, account, {
                from: account,
                // value: zipResult.oraclizeCost,
                value: zipResult.oraclizeCost + (4000000 * 21000000000),
                gas: 1000000
            }))
            .map(tx => tx.tx)
            .do(txHash => console.log("Submitted user registration tx: " + txHash))
    }

    debugOraclizeQuery() {
        return this.youtubeToken
            .flatMap(youtubeToken => this.observableFromEvent(youtubeToken.DebugOraclizeQuery()))
            .do(debugResponse => console.log("Debug event query: " + debugResponse.args.query))
    }

    logSubscriptionCountUpdated() {
        return this.youtubeToken
            .flatMap(youtubeToken => this.observableFromEvent(youtubeToken.LogBalanceUpdatedWithSubscriptionCount()))
    }

    observableFromEvent(contractEvent) {
        return Rx.Observable.create(observer => {
            contractEvent.watch((error, response) => {
                if (!error) {
                    observer.next(response)
                } else {
                    observer.error(error)
                }
            })
        })
    }
}

export default YoutubeTokenCommands
