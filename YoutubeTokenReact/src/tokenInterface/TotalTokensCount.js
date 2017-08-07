import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

const TotalTokensCount = (props) => (
    <p>Total Youtube Tokens: {props.totalTokens}</p>
)

TotalTokensCount.propTypes = {
    totalTokens: PropTypes.number
}

TotalTokensCount.defaultProps = {
    totalTokens: 0
}

export default class TotalTokensCountContainer extends Component {

    state = {totalTokens: 0}

    static propTypes = {
        tokenUpdatedTrigger: PropTypes.instanceOf(Rx.Observable)
    }

    componentWillMount() {
        this.props.tokenUpdatedTrigger
            .flatMap(youtubeTokenBridge => youtubeTokenBridge.getTotalYoutubeTokens())
            .subscribe(totalTokens => this.setState({totalTokens}), error => console.log(error))
    }

    render() {
        return (<TotalTokensCount totalTokens={this.state.totalTokens}/>)
    }
}
