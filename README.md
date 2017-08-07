# react-solidity-playground

Basic React projects for personal development. With the aim to learn how to build basic interfaces to the Ethereum Solidity contracts I write.

<b>YoutubeTokenReact</b> - Very basic UI. Interfaces with the ERC20 YoutubeToken contract. A user specifies a Youtube username and the subscription count of that username is added to the YoutubeToken and given to the original calling account, currently the calling account's coinbase. There is a spinner which signifies loading, which includes the wait for the Oraclize callback. No error is relayed to the user if it is not successful although the spinner will stop. I have attempted to adhere to React best practices to ensure modularity and have used Rxjs for retrieving and manipulating data.
