import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

//helper func
const addCartItem = (cartItems:CartItem[], productToAdd:CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      {...cartItem, quantity: cartItem.quantity + 1}
      :
      cartItem
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}

//helper function
const removeCartItem = (cartItems:CartItem[], productToRemove:CartItem) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem && existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  } 
  return cartItems.map((cartItem) => 
    cartItem.id === productToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1}
      :
      cartItem
  )
  // Check if quantity is equal to 1, if it is , remove that item from the cart
  // return cartItems with matching cartItem with reduce
}

// helper function
const deleteCartItem = (cartItems:CartItem[], productToDelete:CartItem) => {
  return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
}


export type SetIsCartOpen =ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems =ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[]>;

export const setIsCartOpen = withMatcher((bool:boolean):SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher((cartItems:CartItem[]):SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems:CartItem[], product:CategoryItem) => {
  const newCartItems = addCartItem(cartItems, product);
  return setCartItems(newCartItems);
}
  
export const removeItemFromCart = (cartItems:CartItem[], product:CartItem) => {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
}
  
export const deleteItemFromCart = (cartItems:CartItem[], product:CartItem) => {
  const newCartItems = deleteCartItem(cartItems, product);
  return setCartItems(newCartItems);
}




