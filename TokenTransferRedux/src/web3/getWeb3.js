import store from '../redux/store'
import Web3 from 'web3'
import {initDependencies} from "./DependencyActions"

let getWeb3 = new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function (dispatch) {

        let web3 = window.web3

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)
            console.log('Injected web3 detected.')
            resolve(store.dispatch(initDependencies(web3)))
        } else {
            // Fallback to localhost if no web3 injection.
            const provider = new Web3.providers.HttpProvider('http://localhost:8546')
            web3 = new Web3(provider)
            console.log('No web3 instance injected, using Local web3.')
            resolve(store.dispatch(initDependencies(web3)))
        }
    })
})

export default getWeb3
