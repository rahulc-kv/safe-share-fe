import {
  configureStore,
  isRejectedWithValue,
  Middleware
} from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

// import { invalidateClientDetails, setUserLogout } from '@utils';
// import { ERR_UNAUTHORIZED_CLIENT_ACCESS } from '@constants/errorCodeMapper';
// import baseApi from 'services/api';
import rootReducer from './reducers';
import baseApi from '../services/api';

export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (
    isRejectedWithValue(action) &&
    (action.payload.status === 401 ||
      action.payload?.message?.includes('"statusCode":401'))
  ) {
    // setUserLogout();
    // TODO: Need to confirm whether to do logout api call here
  }
  // if (
  //   isRejectedWithValue(action) &&
  //   action.payload?.data?.error?.message === ERR_UNAUTHORIZED_CLIENT_ACCESS
  // ) {
  //   // invalidateClientDetails();
  // }
  return next(action);
};

const middlewareGroup = [
  baseApi.middleware,
  // authBaseApi.middleware,
  rtkQueryErrorLogger
];


export const store = configureStore({
  reducer: {
    rootReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    // [authBaseApi.reducerPath]: authBaseApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewareGroup)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
