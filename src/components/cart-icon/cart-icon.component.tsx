//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';

import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;