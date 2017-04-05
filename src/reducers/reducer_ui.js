import { combineReducers } from 'redux'
import { UPDATE_FILTER, SELECT_POSITION, EDIT_NEW_POSITION, CANCEL_EDIT_NEW_POSITION } from '../actions/index'
import { ADD_POSITION } from '../actions/position'

const INITIAL_STATE = {
  filter: 'active',
  selectedPosition: null,
  isEditingNewPosition: false
}

function uiReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_FILTER :
          return {
            ...state,
            filter: action.payload.filter
          }
        case SELECT_POSITION :
        case ADD_POSITION :
          return {
            ...state,
            isEditingNewPosition: false,
            selectedPosition: action.payload.id
          }
        case EDIT_NEW_POSITION :
          return {
            ...state,
            isEditingNewPosition: true,
            selectedPosition: null
          }
        case CANCEL_EDIT_NEW_POSITION :
          return {
            ...state,
            isEditingNewPosition: false,
            selectedPosition: null
          }
        default : return state
    }
}

export default uiReducer
