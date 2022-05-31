import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import  thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

/* const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action)
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState:', store.getState());

  next(action); // This is why the logger execution in redux logger is off

  console.log('next state: ', store.getState())
} */

const persistConfig = {
  key: 'root',
  storage,
  blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)

// to use redux dev tools chrome extension
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose


const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
//const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
//export const store = createStore(rootReducer, undefined, composedEnhancers);
// without persist reducer

export const persistor = persistStore(store);