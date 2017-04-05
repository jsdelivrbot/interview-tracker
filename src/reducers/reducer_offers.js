import { combineReducers } from 'redux'
import { RECEIVE_OFFER, UPDATE_OFFER_DECISION } from '../actions/offer'

function addOfferEntry(state, action) {
    const {payload} = action
    const {id} = payload
    return {
        ...state,
        [id] : payload
    }
}

// TODO : Function seems a bit agnostic despite the specificity of the name
function setOfferDecision(state, action) {
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

function offersById(state = {}, action) {
    switch(action.type) {
        case RECEIVE_OFFER : return addOfferEntry(state, action)
        case UPDATE_OFFER_DECISION : return setOfferDecision(state, action)
        default : return state
    }
}

function addOfferId(state, action) {
    const { payload } = action
    const { id } = payload
    return state.concat(id)
}

function allOffers(state = [], action) {
    switch(action.type) {
        case RECEIVE_OFFER : return addOfferId(state, action)
        default : return state
    }
}

const offersReducer = combineReducers({
    byId : offersById,
    allIds : allOffers
})

export default offersReducer
