import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Cell from '../components/cell'

class NewPositionNoRoundsPlaceholder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Cell
        title={this.props.position.companyName}
        subtitle={'New Position'}
        rightDetailText={moment(new Date(this.props.position.startedInterviewingAt)).format('MMM D, h:mm')}
      />
    )
  }
}

function mapStateToProps(state, { positionId, roundId }) {
  const position = state.entities.positions.byId[positionId]
  return {
    position
  }
}

export default connect(mapStateToProps)(NewPositionNoRoundsPlaceholder)
