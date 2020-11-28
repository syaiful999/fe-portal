import { combineReducers } from 'redux'

import authReducer from './auth'
import dashboardReducer from './dashboard'
import videoStreamingReducer from './video-streaming'

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  videoStreamingReducer,
})
export default rootReducer