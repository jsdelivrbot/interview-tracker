import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Cell from '../components/cell'
import Round from '../containers/round'
import Offer from '../containers/offer'
import NewPositionEditForm from '../containers/new_position_edit_form'
import NewRoundEditForm from '../containers/new_round_edit_form'
import NewOfferEditForm from '../containers/new_offer_edit_form'
import { updateRoundDecision } from '../actions/round'
import { updateOfferDecision } from '../actions/offer'

class PositionDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingNewRoundDetails: false,
      isEditingNewOfferDetails: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.position || (this.props && this.props.position && (this.props.position.id !== nextProps.position.id))) {
      this.state = {
        isEditingNewRoundDetails: false,
        isEditingNewOfferDetails: false
      }
    }
  }

  renderPositionHeader() {

    const detailString = this.props.position.didTerminate ?
    `Terminated interview ${moment(new Date(this.props.position.archivedAt)).format('MMM D, h:mm')}` :
    `Began interviewing ${moment(new Date(this.props.position.startedInterviewingAt)).format('MMM D, h:mm')}`

    return (
      <div className="cell">
        <div className="flex flex-space-around">
          <span className="position-header-title">{this.props.position.companyName}</span>
          <span className="position-header-right-detail-text mla">{detailString}</span>
        </div>
        <div className="flex flex-space-around">
          <span className="position-header-subtitle">{this.props.position.position}</span>
        </div>
      </div>
    );
  }

  renderAcceptedRound(round) {
    return (
      <li
        key={round.id}>
        <Cell
          title={round.type}
          rightDetailText={ moment(new Date(round.decisionReceivedAt)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <div
              className="tag passed">
              Passed
            </div>
          </div>
        </Cell>
      </li>
    )
  }

  renderRejectedRound(round) {
    return (
      <li
        key={round.id}>
        <Cell
          title={round.type}
          rightDetailText={ moment(new Date(round.decisionReceivedAt)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <div
              className="tag rejected">
              Rejected
            </div>
          </div>
        </Cell>
      </li>
    )
  }

  renderFutureRound(round) {
    return (
      <li
        key={round.id}>
        <Cell
          title={round.type}
          rightDetailText={ moment(new Date(round.scheduledStartTime)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <div
              className="tag future">
              Up Next
            </div>
          </div>
        </Cell>
      </li>
    )
  }

  renderAcceptedOffer(offer) {
    return (
      <li
        key={offer.id}>
        <Cell
          title="Received Offer"
          subtitle={`\$${offer.baseSalary}`}
          rightDetailText={ moment(new Date(offer.decidedAt)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <div
              className="tag accepted">
              Accepted
            </div>
          </div>
        </Cell>
      </li>
    )
  }

  renderDeclinedOffer(offer) {
    return (
      <li
        key={offer.id}>
        <Cell
          title="Received Offer"
          subtitle={`\$${offer.baseSalary}`}
          rightDetailText={ moment(new Date(offer.decidedAt)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <div
              className="tag declined">
              Declined
            </div>
          </div>
        </Cell>
      </li>
    )
  }

  renderUnclaimedOffer(offer) {
    return (
      <li
        key={offer.id}>
        <Cell
          title="Received Offer"
          subtitle={`\$${offer.baseSalary}`}
          rightDetailText={ moment(new Date(offer.receivedAt)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <button
              onClick={() => this.props.updateOfferDecision(offer.id, 'DECLINED')}
              className="btn btn-default">
              Decline
            </button>
            <button
              onClick={() => this.props.updateOfferDecision(offer.id, 'ACCEPTED')}
              className="btn btn-primary money">
              Accept
            </button>
          </div>
        </Cell>
      </li>
    )
  }

  renderJustCompletedRound(round) {
    return (
      <li
        key={round.id}>
        <Cell
          title={round.type}
          subtitle={`Have you heard back from ${this.props.position.companyName}?`}
          rightDetailText={ moment(new Date(round.scheduledStartTime)).format('MMM D, h:mm') }>
          <div className="flex jc-flex-end">
            <button
              onClick={() => this.props.updateRoundDecision(round.id, 'REJECTED')}
              className="btn btn-default">
              Rejected
            </button>
            <button
              onClick={() => this.props.updateRoundDecision(round.id, 'PASSED')}
              className="btn btn-primary success">
              Success
            </button>
          </div>
        </Cell>
      </li>
    )
  }

  renderOffer() {
    const offer = this.props.offer
    if(!offer) return

    switch (offer.decision) {
    case 'ACCEPTED':
      return this.renderAcceptedOffer(offer)
    case 'DECLINED':
      return this.renderDeclinedOffer(offer)
    default:
      if(!this.props.position.didTerminate) {
        return this.renderUnclaimedOffer(offer)
      }
    }
  }

  renderRounds() {
    return this.props.rounds.map((round) => {
      switch (round.decision) {
      case 'PASSED':
        return this.renderAcceptedRound(round)
      case 'REJECTED':
        return this.renderRejectedRound(round)
      default:
        if(this.props.position.didTerminate) return

        if(!round.decision && round.scheduledStartTime < Date.now()) {
          return this.renderJustCompletedRound(round)
        } else {
          return this.renderFutureRound(round)
        }
      }
    })
  }

  renderNextStepsPlaceholder() {
    if(this.state.isEditingNewRoundDetails || this.state.isEditingNewOfferDetails) return

    if(!this.props.rounds.length) {
      return (
        <li
          key={'xxxxxxxxxxxxxxxx'}>
          <Cell
            title={'Ready... Set...'}
            subtitle={`Add a scheduled interview round and start tracking your progress with ${this.props.position.companyName}.`} >
            <div className="flex jc-flex-end">
              <button
                onClick={() => this.setState({ ...this.state, isEditingNewRoundDetails: true })}
                className="btn btn-primary next">
                Go!
              </button>
            </div>
          </Cell>
        </li>
      )
    } else if(!this.props.position.offer && this.props.rounds[0].decision === 'PASSED') {
      return (
        <li
          key={'yyyyyyyyyyyyyyyy'}>
          <Cell
            title={'Oh, Hello...'}
            subtitle={`You passed your previous interview round with ${this.props.position.companyName}--what’s next?`} >
            <div className="flex jc-flex-end">
              <button
                onClick={() => this.setState({ ...this.state, isEditingNewOfferDetails: true })}
                className="btn btn-default">
                Received Offer
              </button>
              <button
                onClick={() => this.setState({ ...this.state, isEditingNewRoundDetails: true })}
                className="btn btn-primary next">
                Next Round
              </button>
            </div>
          </Cell>
        </li>
      )
    }
  }

  handleFinishEdit() {
    this.setState({
      ...this.state,
      isEditingNewRoundDetails: false,
      isEditingNewOfferDetails: false
    })
  }

  renderPositionDetails() {
    return (
      <div>
        {this.renderPositionHeader()}
        {this.state.isEditingNewRoundDetails ?
          <NewRoundEditForm
            positionId={this.props.position.id}
            onSubmit={this.handleFinishEdit.bind(this)}
            onCancel={this.handleFinishEdit.bind(this)} /> :
          (this.state.isEditingNewOfferDetails ?
            <NewOfferEditForm
              positionId={this.props.position.id}
              onSubmit={this.handleFinishEdit.bind(this)}
              onCancel={this.handleFinishEdit.bind(this)} /> : '')}
        <ul>
          {this.renderNextStepsPlaceholder()}
          {this.renderOffer()}
          {this.renderRounds()}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="card">
        {this.props.isEditingNewPosition ? <NewPositionEditForm /> :  ( this.props.position ? this.renderPositionDetails() : '')}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const props = {
    isEditingNewPosition: state.ui.isEditingNewPosition
  }

  if(state.ui.selectedPosition) {

    const currentPosition = state.entities.positions.byId[state.ui.selectedPosition]
    return {
      ...props,
      position: currentPosition,
      rounds: currentPosition.rounds.map(id => state.entities.rounds.byId[id]).reverse(),
      offer: state.entities.offers.byId[currentPosition.offer],
    }
  } else {
    return props
  }
}

export default connect(mapStateToProps, { updateRoundDecision, updateOfferDecision })(PositionDetails)
