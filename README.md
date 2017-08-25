# react-solidity-playground

Basic React Truffle Box projects for personal development. With the aim to learn how to build basic interfaces to the Ethereum Solidity contracts I write. I may experiment with uploading one of these to Swarm of IPFS.

<b>YoutubeTokenReact</b> - Based on the React Truffle Box. Very basic UI. Interfaces with the ERC20 YoutubeToken contract. A user specifies a Youtube username and the subscription count of that username is added to the YoutubeToken and given to the original calling account, currently the calling account's coinbase. There is a spinner which signifies loading, which includes the wait for the Oraclize callback. No error is relayed to the user if it is not successful although the spinner will stop. 

I have attempted to adhere to React best practices to ensure modularity and have used Rxjs for retrieving and manipulating data. The parent component (YoutubeTokenInterface.js) creates and passes through props an Rx trigger which emits a bridge object to the YoutubeToken. Child components subscribe to this trigger and when updates are triggered they receive the bridge object with which they can retrieve newly updated values from the contract. This is deployed and tested on testrpc and Rinkeby (using local web3 and MetaMask). 

Future improvements: Add tests. Allow the user to select the account they want to use. Require that the account benefitting for a specified Youtube username be registered prior to this process elsewhere. More details at the bottom of <a href="https://github.com/willjgriff/solidity-playground">here</a>

<b>TokenTransferRedux</b> - Based on the React Truffle Box (didn't need all the complexity/dependencies of the Redux Auth Truffle Box). Interfaces with a standard ERC20 token. Has a slightly prettier interface than YoutubeTokenReact. Uses basics of Redux including redux-observable to manage state changes and very basic experimentation with react-redux-router.
