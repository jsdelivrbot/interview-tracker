import { combineReducers } from 'redux'
import PositionsReducer from './reducer_positions'
import RoundsReducer from './reducer_rounds'
import OffersReducer from './reducer_offers'

const entitiesReducer = combineReducers({
  positions: PositionsReducer,
  rounds: RoundsReducer,
  offers: OffersReducer
})

export default entitiesReducer
