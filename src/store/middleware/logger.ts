import { Middleware } from 'redux';
import { RootState } from '../store';

export const LoggerMiddleware:Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type)
  console.log('payload: ', action.paylod)
  console.log('currentState: ', action.getState());

  next(action);
  console.log('next state:', store.getState())
}