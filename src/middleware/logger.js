export const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action)
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState:', store.getState());

  next(action); // This is why the logger execution in redux logger is off

  console.log('next state: ', store.getState())
}