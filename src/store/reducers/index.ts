import { combineReducers } from 'redux';
import farmerReducer from './farmerReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  farmer: farmerReducer,
  alert: alertReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
