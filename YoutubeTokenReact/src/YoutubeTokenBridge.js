import Rx from 'rxjs/Rx'
import BigNumber from 'bignumber.js'
import YoutubeToken from '../build/contracts/YoutubeToken.json'
import Web3Bridge from './utils/Web3Bridge.js'

// TODO: Get rid of all the 'do' logging statements
export default class YoutubeTokenBridge {

    constructor(web3) {
        const contract = require('truffle-contract')
        const youtubeTokenContract = contract(YoutubeToken)
        youtubeTokenContract.setProvider(web3.currentProvider)

        this.web3 = web3
        this.web3Bridge = new Web3Bridge(web3)
        this.youtubeToken = Rx.Observable
            .fromPromise(youtubeTokenContract.deployed())
            .shareReplay(1)
    }

    getOraclizeCost() {
        return this.youtubeToken
            .flatMap(youtubeToken => youtubeToken.getOraclizeFee())
            .map(oraclizeFeeBigNumber => oraclizeFeeBigNumber.toNumber())
            .do(oraclizeFeeInEther => console.log("Oraclize fee in Wei: " + oraclizeFeeInEther))
    }

    getOraclizeCostInEther() {
        return this.getOraclizeCost()
            .map(oraclizeFeeInWei => this.web3.fromWei(oraclizeFeeInWei, 'ether'))
    }

    getBalanceOfCoinbase() {
        const account = this.web3Bridge.getCoinbase()
        return this.youtubeToken
            .flatMap(youtubeToken => Rx.Observable.zip(youtubeToken.balanceOf(account), youtubeToken.decimals(),
                (balance, tokenDecimals) => { return { balance: balance, tokenDecimals: tokenDecimals } }))
            .map(zipResult => { zipResult.tokenDecimals = new BigNumber("1.0e+" + zipResult.tokenDecimals); return zipResult })
            .map(editedZipResult => editedZipResult.balance.div(editedZipResult.tokenDecimals))
            .map(balanceBigNumber => { return {
                account: account,
                balance: balanceBigNumber.toNumber()
            }})
            .do(balance => console.log("Account: " + balance.account + " Balance: " + balance.balance))
    }

    getTotalYoutubeTokens() {
        return this.youtubeToken
            .flatMap(youtubeToken => youtubeToken.totalSupply())
            .map(totalSupplyBigNumber => totalSupplyBigNumber.toNumber())
            .do(totalSupply => console.log("Total Supply: " + totalSupply))
    }

    addUserSubscriptionCount(user) {
        return this.youtubeToken
            .zip(this.getOraclizeCost(), (youtubeToken, oraclizeCost) => { return { youtubeToken: youtubeToken, oraclizeCost: oraclizeCost } })
            .flatMap(zipResult => zipResult.youtubeToken.registerUser(user, this.web3Bridge.getCoinbase(), {
                from: this.web3Bridge.getCoinbase(),
                // TODO: The extra gas here is for the Oraclize callback cost, the gas price should be dynamic and determined by the contract.
                value: zipResult.oraclizeCost + (400000 * 21000000000),
                // Esitimated with youtubeToken.registerUser.estimateGas("wood", web3.eth.accounts[0], {from:web3.eth.accounts[0]}) = 320000
                gas: 400000
            }))
            .map(tx => tx.tx)
            .do(txHash => console.log("Submitted user registration tx: " + txHash))
    }

    debugOraclizeQuery() {
        return this.youtubeToken
            .flatMap(youtubeToken => this.web3Bridge.observableFromEvent(youtubeToken.DebugOraclizeQuery()))
            .do(debugResponse => console.log("Debug event query: " + debugResponse.args.query))
    }

    LogFutureSubscriptionCountUpdated() {
        // Skipping logs in the current block is acceptable because any tx's submitted for which
        // we are waiting for a response can only happen in a block later than the current one.
        return this.web3Bridge.getCurrentBlockNumber()
            .concatMap(currentBlockNumber => this.youtubeToken
                .flatMap(youtubeToken => this.logSubscriptionCountUpdated(youtubeToken))
                .filter(subscriptionUpdateResponse => subscriptionUpdateResponse.blockNumber !== currentBlockNumber))
            .do(subscriptionUpdateResponse => console.log("Susbcription count updated, skipped current block"))
    }

    logSubscriptionCountUpdated(youtubeToken) {
        return this.web3Bridge.observableFromEvent(youtubeToken.LogBalanceUpdatedWithSubscriptionCount())
    }
}
