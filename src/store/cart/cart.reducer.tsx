//import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from './cart.types';
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
  readonly cartCount: number;
  readonly cartTotal: number;
  
}
const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
}

export const cartReducer = (state=CART_INITIAL_STATE, action={} as AnyAction):CartState => {
  const { payload } = action;
  if(setCartItems.match(action)){
    return { ...state, cartItems:payload}
  }
  if(setIsCartOpen.match(action)){
    return {...state, isCartOpen:payload}
  }
  return state
  
}