import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
}

// If you make payload optional in the above type so it can be used in both cases,
// it allows for payload to be undefined  and we don't want that.
export type Action<T> ={
  type: T;
}

// Overloading createAction
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }
}


