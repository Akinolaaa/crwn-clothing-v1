import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
//import  thunk from 'redux-thunk'; // for async side-effect handling in redux
import createSagaMiddleware from 'redux-saga'; // saga replaces thunks but it is fired after reducers are updated unlike other middleware
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist:['cart'],
  //blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)

// to use redux dev tools chrome extension
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose


const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
//const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
//export const store = createStore(rootReducer, undefined, composedEnhancers);
// without persist reducer

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
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