import { UserState } from "./user.reducer";
import { createSelector } from "reselect";
import { User } from "./user.types";
import { RootState } from '../store';

export const selectUserReducer = (state:RootState ):UserState => state.user
export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user):User => user.currentUser as User 
); 