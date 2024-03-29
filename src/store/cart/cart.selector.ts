import { createSelector } from 'reselect'; 
import { CartState } from './cart.reducer';
import { RootState } from '../store';
// recall, it is used when you do some manipulations of data in reducer for caching(memoization) 

const selectCartReducer = (state:RootState):CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer],
  (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector([selectCartReducer],
  (cart) => cart.isCartOpen
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cart) =>  cart.reduce(
    (total, cartItem) =>  total + cartItem.quantity * cartItem.price, 0)
);

export const selectCartCount = createSelector([selectCartItems],(cart) => {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0)
} 
);
