import { combineReducers } from 'redux'
import { ADD_ROUND, UPDATE_ROUND_DECISION } from '../actions/round'

function addRoundEntry(state, action) {
    const {payload} = action
    const {id} = payload
    return {
        ...state,
        [id] : payload
    }
}

// TODO : Function seems a bit agnostic despite the specificity of the name
function setRoundDecision(state, action) {
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

function roundsById(state = {}, action) {
    switch(action.type) {
        case ADD_ROUND : return addRoundEntry(state, action)
        case UPDATE_ROUND_DECISION : return setRoundDecision(state, action)
        default : return state
    }
}

function addRoundId(state, action) {
    const { payload } = action
    const { id } = payload
    return state.concat(id)
}

function allRounds(state = [], action) {
    switch(action.type) {
        case ADD_ROUND : return addRoundId(state, action)
        default : return state
    }
}

const roundsReducer = combineReducers({
    byId : roundsById,
    allIds : allRounds
})

export default roundsReducer
