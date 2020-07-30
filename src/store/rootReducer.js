import { combineReducers } from 'redux';

// reducers
import { starterReducer } from './modules/starter';

export default combineReducers({
  starter: starterReducer,
});
