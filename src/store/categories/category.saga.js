import { takeLatest, all, call, put} from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORY_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync () {
  try {
    // Anywhere you have a function and you want to turn it into an effect, use call
    const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
    // Put is the generator version of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
};

export function*  onFetchCategories() {
  yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  // all means run everything inside and dont return till they are done
  yield all([call(onFetchCategories)])
}