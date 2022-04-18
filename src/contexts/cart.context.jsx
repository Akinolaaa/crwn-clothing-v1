import { createContext, useState, useEffect } from 'react';

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

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  deleteItemFromCart: () => null,
  cartCount: 0,
  total: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem) =>
      total + cartItem.quantity
    , 0);
    setCartCount(newCartCount);
  }, [cartItems])


  useEffect(()=>{
    const newCartTotal = cartItems.reduce((total, cartItem) =>
      total + (cartItem.quantity * cartItem.price)
    , 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  }

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  }

  const deleteItemFromCart = (product) => {
    setCartItems(deleteCartItem(cartItems, product));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartCount,
    setCartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}