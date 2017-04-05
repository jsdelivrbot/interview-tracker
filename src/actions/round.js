import { nextId } from '../utils/id'

export const ADD_ROUND = 'add_round'
export const UPDATE_ROUND_DECISION = 'update_round_decision'

export function addRound(positionId, type, startTime, endTime) {
  return {
    type: ADD_ROUND,
    payload: {
      id: nextId('round'),
      positionId,
      type,
      scheduledStartTime: startTime,
      scheduledEndTime: endTime,
      decision: null,
      decisionReceivedAt: null
    }
  }
}

export function updateRoundDecision(id, decision) {
  return {
    type: UPDATE_ROUND_DECISION,
    payload: {
      id,
      decision,
      decisionReceivedAt: Date.now()
    }
  }
}
