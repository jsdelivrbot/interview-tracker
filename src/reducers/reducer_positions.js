import { combineReducers } from 'redux'
import { ADD_POSITION, TERMINATE_POSITION } from '../actions/position'
import { ADD_ROUND } from '../actions/round'
import { RECEIVE_OFFER } from '../actions/offer'

function addPositionEntry(state, action) {
    const {payload} = action
    const {id} = payload
    return {
        ...state,
        [id] : payload
    }
}

// TODO : Function seems a bit agnostic despite the specificity of the name
function terminatePositionEntry(state, action) {
    const {payload} = action
    const {id} = payload

    return {
        ...state,
        [id] : {
          ...state[id],
          ...payload
        }
    }
}

function addRoundId(state, action) {
    const {payload} = action
    const {id, positionId} = payload
    return {
        ...state,
        [positionId] : {
          ...state[positionId],
          rounds: state[positionId].rounds.concat(id)
        }
    }
}

function setOfferId(state, action) {
    const {payload} = action
    const {id, positionId} = payload

    return {
        ...state,
        [positionId] : {
          ...state[positionId],
          offer: id
        }
    }
}

function positionsById(state = {}, action) {
    switch(action.type) {
        case ADD_POSITION : return addPositionEntry(state, action)
        case TERMINATE_POSITION : return terminatePositionEntry(state, action)
        case ADD_ROUND : return addRoundId(state, action)
        case RECEIVE_OFFER : return setOfferId(state, action)
        default : return state
    }
}

function addPositionId(state, action) {
    const { payload } = action
    const { id } = payload
    return state.concat(id)
}

function allPositions(state = [], action) {
    switch(action.type) {
        case ADD_POSITION : return addPositionId(state, action)
        default : return state
    }
}

const positionsReducer = combineReducers({
    byId : positionsById,
    allIds : allPositions
})

export default positionsReducer
