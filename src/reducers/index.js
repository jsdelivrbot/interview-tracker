import { combineReducers } from 'redux'
import UiReducer from './reducer_ui'
import EntitiesReducer from './reducer_entities'

const rootReducer = combineReducers({
  ui: UiReducer,
  entities: EntitiesReducer
})

export default rootReducer
