export const UPDATE_FILTER = 'update_filter'
export const SELECT_POSITION = 'select_position'
export const EDIT_NEW_POSITION = 'edit_new_position'
export const CANCEL_EDIT_NEW_POSITION = 'cance;_edit_new_position'

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    payload: {
      filter
    }
  }
}

export function selectPosition(id) {
  return {
    type: SELECT_POSITION,
    payload: {
      id
    }
  }
}

export function editNewPosition() {
  return {
    type: EDIT_NEW_POSITION
  }
}

export function cancelEditNewPosition() {
  return {
    type: CANCEL_EDIT_NEW_POSITION
  }
}
