import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Cell from '../components/cell'

class Offer extends React.Component {
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
        subtitle={`\$${new Intl.NumberFormat().format(this.props.offer.baseSalary)}`}
        rightDetailText={moment(new Date(this.props.offer.receivedAt)).format('MMM D, h:mm')}
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

function mapStateToProps(state, { positionId, offerId }) {
  const position = state.entities.positions.byId[positionId]
  const offer = state.entities.offers.byId[offerId]
  return {
    position,
    offer
  }
}

export default connect(mapStateToProps)(Offer)
