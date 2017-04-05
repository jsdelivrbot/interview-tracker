import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { selectPosition } from '../actions/index'
import SectionHeader from '../components/section_header'
import Round from '../containers/round'
import Offer from '../containers/offer'
import NewPositionNoRoundsPlaceholder from '../containers/new_position_no_rounds_placeholder'
import TerminatedPositionPlaceholder from '../containers/terminated_position_placeholder'

class GlobalActivityFeed extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRound({ positionId, roundId }) {
    return (
      <li
        key={positionId}
        onClick={() => this.props.selectPosition(positionId)}
        className={this.props.selectedPosition === positionId ? 'selected' : ''}>
          <Round positionId={positionId} roundId={roundId} shouldDisplayPosition={true} shouldDecorate={false} />
      </li>
    )
  }

  renderFutureRounds(futureRounds) {
    return futureRounds.map(this.renderRound.bind(this))
  }

  renderRecentlyCompletedRounds(recentlyCompletedRounds) {
    return recentlyCompletedRounds.map(this.renderRound.bind(this))
  }

  renderReadyForNextRounds(readyForNextRounds) {
    return readyForNextRounds.map(({ positionId, roundId }) => {
      if(typeof roundId !== 'undefined' && roundId !== null) {
        return this.renderRound({ positionId, roundId })
      } else {
        return (
          <li
            key={positionId}
            onClick={() => this.props.selectPosition(positionId)}
            className={this.props.selectedPosition === positionId ? 'selected' : ''}>
              <NewPositionNoRoundsPlaceholder positionId={positionId} />
          </li>
        )
      }
    })
  }

  renderRejectedRounds(rejectedRounds) {
    return rejectedRounds.map(this.renderRound.bind(this))
  }

  renderOffer({ positionId, offerId }) {
    return (
      <li
        key={positionId}
        onClick={() => this.props.selectPosition(positionId)}
        className={this.props.selectedPosition === positionId ? 'selected' : ''}>
          <Offer positionId={positionId} offerId={offerId} shouldDisplayPosition={true} shouldDecorate={false} />
      </li>
    )
  }

  renderUnclaimedOffers(unclaimedOffers) {
    return unclaimedOffers.map(this.renderOffer.bind(this))
  }

  renderDeclinedOffers(declinedOffers) {
    return declinedOffers.map(this.renderOffer.bind(this))
  }

  renderCurrentlyAcceptedOffer(currentlyAcceptedOffer) {
    console.log('ues')
    return this.renderOffer(currentlyAcceptedOffer)
  }

  renderTerminatedPositions(terminatedPositions) {
    return terminatedPositions.map(({ positionId }) => {
      return (
        <li
          key={positionId}
          onClick={() => this.props.selectPosition(positionId)}
          className={this.props.selectedPosition === positionId ? 'selected' : ''}>
            <TerminatedPositionPlaceholder positionId={positionId} />
        </li>
      )
    })
  }

  getHeaderTitle(sectionTitle, sectionContentsCount) {
    return sectionContentsCount ? `${sectionTitle} (${sectionContentsCount})` : sectionTitle
  }

  renderSection(title, colorClass, contents, renderer) {
    if(contents === null || (Array.isArray(contents) && !contents.length)) return

    return (
      <div>
        <SectionHeader className={colorClass} text={this.getHeaderTitle(title, contents.length || 0)} />
        <ul>
          {renderer(contents)}
        </ul>
      </div>
    )
  }

  render() {

    // TODO : Tabs for Active vs Archived

    return (
      <div className="card sidebar">
        {/* ACTIVE */}
        {this.renderSection('Up Next', 'future', this.props.futureRounds, this.renderFutureRounds.bind(this))}
        {this.renderSection('Recently Completed', 'recently-completed', this.props.recentlyCompletedRounds, this.renderRecentlyCompletedRounds.bind(this))}
        {this.renderSection('Ready for Next Round', 'ready-for-next-round', this.props.readyForNextRounds, this.renderReadyForNextRounds.bind(this))}
        {this.renderSection('Unclaimed Offers', 'unclaimed', this.props.unclaimedOffers, this.renderUnclaimedOffers.bind(this))}
        {/* ARCHIVED */}
        {this.renderSection('Declined Offer', 'declined', this.props.declinedOffers, this.renderDeclinedOffers.bind(this))}
        {this.renderSection('Terminated', 'terminated', this.props.terminatedPositions, this.renderTerminatedPositions.bind(this))}
        {this.renderSection('Rejected', 'rejected', this.props.rejectedRounds, this.renderRejectedRounds.bind(this))}
        {/* CURRENT */}
        {this.renderSection('Currently Accepted Offer', 'current', this.props.currentlyAcceptedOffer, this.renderCurrentlyAcceptedOffer.bind(this))}
      </div>
    )
  }
}

// TODO : Lift this logic out and merge it with Redux State
// Compute once at initialization, and then update when actions are fired
function partitionLatestPositionActivity(positions, roundsById, offersById) {

  let partition = {
    futureRounds: [],                 // DONE
    recentlyCompletedRounds: [],      // DONE
    readyForNextRounds: [],           // DONE
    unclaimedOffers: [],              // DONE
    declinedOffers: [],               // DONE
    rejectedRounds: [],               // DONE
    terminatedPositions: [],          // DONE
    currentlyAcceptedOffer: null      // DONE
  }

  positions.forEach(({ id, rounds, offer, didTerminate }) => {
    // Check if terminated
    if(didTerminate) {
      partition.terminatedPositions.push({ positionId: id })
      return
    }

    // Check if an offer exists
    if(typeof offer !== 'undefined' && offer !== null) {
      const offerMetaData = { positionId: id, offerId: offer }
      const { decision } = offersById[offer]
      switch (decision) {
      case 'ACCEPTED':
        partition.currentlyAcceptedOffer = offerMetaData
        return
      case 'DECLINED':
        partition.declinedOffers.push(offerMetaData)
        return
      default:
        partition.unclaimedOffers.push(offerMetaData)
        return
      }
    }

    // Check for new positions
    if(!rounds.length) {
      partition.readyForNextRounds.push({ positionId: id })
      return
    }

    const mostRecentRoundId = rounds[rounds.length-1]
    const roundMetaData = { positionId: id, roundId: mostRecentRoundId }

    // Determine membership by most recent round
    const mostRecentRound = roundsById[mostRecentRoundId]
    switch (mostRecentRound.decision) {
    case 'PASSED':
      partition.readyForNextRounds.push(roundMetaData)
      return
    case 'REJECTED':
      partition.rejectedRounds.push(roundMetaData)
      return
    default:
      // TODO : This won't be automatic--relies on a state change
      if(mostRecentRound.scheduledEndTime < Date.now()) {
        partition.recentlyCompletedRounds.push(roundMetaData)
      } else {
        partition.futureRounds.push(roundMetaData)
      }
      return
    }
  })

  return partition
}

function mapStateToProps(state, ownProps) {
  const partitionedActivity = partitionLatestPositionActivity(
    state.entities.positions.allIds.map((id) => {
      return state.entities.positions.byId[id]
    }),
    state.entities.rounds.byId,
    state.entities.offers.byId
  )

  return {
    ...partitionedActivity,
    filter: state.ui.filter,
    selectedPosition: state.ui.selectedPosition
  }
}

export default connect(mapStateToProps, { selectPosition })(GlobalActivityFeed)
