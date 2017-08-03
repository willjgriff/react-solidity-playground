import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

var OraclizeDetails = (props) => {
    return (
        <div>
            <p>&nbsp;&nbsp;&nbsp;Oraclize query (from debug event): {props.oraclizeQuery}
            <br/>&nbsp;&nbsp;&nbsp;Oraclize query cost (in Ether): {props.oraclizeFee}</p>
        </div>
    )
}

OraclizeDetails.propTypes = {
    oraclizeQuery: PropTypes.string,
    oraclizeFee: PropTypes.string
}

OraclizeDetails.defaultProps = {
    oraclizeQuery: "~~~",
    oraclizeFee: ""
}

export default class OraclizeDetailsContainer extends Component {

    state = {
        oraclizeQuery: "~~~",
        oraclizeFee: ""
    }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.debugOraclizeQuery())
            .subscribe(logResponse => this.setState({ oraclizeQuery: logResponse.args.query }), error => console.log(error))

        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getOraclizeCostInEther())
            .subscribe(oraclizeFee => this.setState({ oraclizeFee }), error => console.log(error))
    }

    render() {
        return (<OraclizeDetails oraclizeQuery={this.state.oraclizeQuery} oraclizeFee={this.state.oraclizeFee} />)
    }
}
