import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';
//import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
//import { CartContext } from '../../contexts/cart.context';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.jsx';
import { setIsCartOpen } from '../../store/cart/cart.action.jsx';


const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
    dispatch(setIsCartOpen(false));
  }
  return(
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ?
          (cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)) :
          (<EmptyMessage > Your cart is empty</EmptyMessage>)
        }
      </CartItems>

      <Button onClick={goToCheckoutHandler}> Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown