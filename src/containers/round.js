import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Cell from '../components/cell'
import moment from 'moment'

class Round extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDecoration() {
    // TODO (Details View)
  }

  renderWithPosition() {
    return (
      <Cell
        title={this.props.position.companyName}
        subtitle={this.props.round.type}
        rightDetailText={
            moment(new Date(this.props.round.scheduledStartTime)).format('MMM D, h:mm')
        }
        tag={null}
        actions={null}
        primaryColor={null}
      />
    )
  }

  renderWithoutPosition() {
    // TODO (Details View)
  }

  render() {
    return (
      <div>
        {this.props.shouldDisplayPosition ? this.renderWithPosition() : this.renderWithoutPosition()}
      </div>
    )
  }
}

function mapStateToProps(state, { positionId, roundId }) {
  const position = state.entities.positions.byId[positionId]
  const round = state.entities.rounds.byId[roundId]
  return {
    position,
    round
  }
}

export default connect(mapStateToProps)(Round)
