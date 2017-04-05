import { nextId } from '../utils/id'

export const RECEIVE_OFFER = 'receive_offer'
export const UPDATE_OFFER_DECISION = 'update_offer_decision'

export function receiveOffer(positionId, baseSalary) {
  return {
    type: RECEIVE_OFFER,
    payload: {
      id: nextId('offer'),
      positionId,
      baseSalary,
      receivedAt: Date.now(),
      decision: null,
      decidedAt: null
    }
  }
}

export function updateOfferDecision(id, decision) {
  return {
    type: UPDATE_OFFER_DECISION,
    payload: {
      id,
      decision,
      decidedAt: Date.now()
    }
  }
}
