import { Category, CATEGORY_ACTION_TYPES } from "./category.types";

import { CategoryAction } from './category.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}
export const CATEGORIES_INITIAL_STATE:CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE, action={} as CategoryAction ) => {
  // Since Category action is a union of multiple types, payload cannot be destructured from action,
  // TS is a able to infer from the action cases which type would have a payload.
  switch(action.type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true};
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.payload, isLoading: false};
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {...state, error: action.payload, isLoading: false};
    default: 
      return state;
  }
}