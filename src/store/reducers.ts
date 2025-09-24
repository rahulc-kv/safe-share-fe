import { combineReducers } from 'redux';

import { store } from './store';
import reducers from '../reducers';

const rootReducer = combineReducers({ ...reducers });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
