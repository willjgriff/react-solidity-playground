import TokenBridge from "../web3/TokenBridge"
import getWeb3 from "../web3/getWeb3"
import Rx from "rxjs"
import Web3Bridge from "../web3/Web3Bridge"

// Create dependency streams, not sure where the best place is to instantiate these.
// Also it's a shame they have to be streams. Would be simpler if getting web3 wasn't from a promise.
export const web3$ = Rx.Observable
    .fromPromise(getWeb3).map(response => response.web3)
    .shareReplay(1)

export const tokenBridge$ = web3$
    .map(web3 => new TokenBridge(web3))
    .shareReplay(1)

export const web3Bridge$ = web3$
    .map(web3 => new Web3Bridge(web3))
    .shareReplay(1)