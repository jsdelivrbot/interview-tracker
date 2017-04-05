import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Cell from '../components/cell'

class TerminatedPositionPlaceholder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Cell
        title={this.props.position.companyName}
        rightDetailText={moment(new Date(this.props.position.archivedAt)).format('MMM D, h:mm')}
      />
    )
  }
}

function mapStateToProps(state, { positionId }) {
  const position = state.entities.positions.byId[positionId]
  return {
    position
  }
}

export default connect(mapStateToProps)(TerminatedPositionPlaceholder)
