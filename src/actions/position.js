import { nextId } from '../utils/id'

export const ADD_POSITION = 'add_position'
export const TERMINATE_POSITION = 'terminate_position'

export function addPosition(companyName, position) {
  return {
    type: ADD_POSITION,
    payload: {
      id: nextId('position'),
      companyName,
      position,
      startedInterviewingAt: Date.now(),
      rounds: [],
      offer: null,
      didTerminate: null,
      archivedAt: null
    }
  }
}

export function terminatePosition(id) {
  return {
    type: TERMINATE_POSITION,
    payload: {
      id,
      didTerminate: true,
      archivedAt: Date.now()
    }
  }
}
