import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from 'redux';
import { signInFailed, signInSuccess, signUpFailed, signOutFailed, signOutSuccess } from "./user.action";

export type UserState = {
  currentUser: UserData | null;
  error: Error | null;
}
const USER_INITIAL_STATE:UserState = {
  currentUser: null,
  error: null,
};

export const userReducer = (state=USER_INITIAL_STATE, action={} as AnyAction):UserState => {
  const { payload } = action;
  if(signInSuccess.match(action)){
    return {
      ...state,
      currentUser: payload,
    }
  }
  if(signInFailed.match(action) || signOutFailed.match(action)|| signUpFailed.match(action)) {
    return {
      ...state,
      error: payload,
    }
  }
  if(signOutSuccess.match(action)) {
    return {
      ...state, currentUser: null,
      error: null,
    }
  }
  return state;
}
  // switch(type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //     }
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //     }
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state, currentUser: null,
  //       error: null,
  //     }
  //   default:
  //     return state;
  // }
