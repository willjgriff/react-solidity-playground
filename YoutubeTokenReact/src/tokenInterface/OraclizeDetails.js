import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

export default class OraclizeDetails extends Component {

    state = {
        oraclizeQuery: "",
        oraclizeFee: 0
    }

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.debugOraclizeQuery())
            .subscribe(logResponse => this.setState({ oraclizeQuery: logResponse.args.query }))

        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getOraclizeCost())
            .subscribe(oraclizeFee => this.setState({ oraclizeFee: oraclizeFee }))
    }

    render() {
        return (
            <div>
                <p>&nbsp;&nbsp;&nbsp;Oraclize query: {this.state.oraclizeQuery}
                <br/>&nbsp;&nbsp;&nbsp;Oraclize query cost: {this.state.oraclizeFee}</p>
            </div>
        )
    }
}
