import {all, call} from 'typed-redux-saga/macro';
// import {all, call} from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

/* Generator functions are similar to async functions
* A generator fxn won't run unless you call .next()
* Invoking .next() on the fuction returns an {value: undefined, done: true} 
* Test in console with:
  function* gen() {
    console.log('a');
  }
  const g = gen();
  g.next()
  /////////
* function* gen(i)* {
    yield i;
    yield i + 10;
    return 12;
  }
  const g = gen(5);
  gObj = g.next(); // value:5 , done: false
  jObj = g.next(); // value: 15, done: false
  ret = g.next(); //  value: 12, done: true
*/

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)])
}