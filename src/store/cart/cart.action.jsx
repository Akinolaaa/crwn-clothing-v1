import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


/* const dispatch = useDispatch();
const cartItems = useSelector(selectCartItems); */

//helper func
const addCartItem = (cartItems, productToAdd) => {
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
const removeCartItem = (cartItems, productToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem.quantity === 1){
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
const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
}

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
  
export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
  
export const deleteItemFromCart = (cartItems, product) => {
  const newCartItems = deleteCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


