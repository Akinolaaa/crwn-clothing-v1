import { FC } from 'react';
import { CartItem } from '../../store/cart/cart.types';
import './cart-item.styles.scss';

export type CartItemProps = {
  cartItem: CartItem
}

const CartItemComponent:FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default CartItemComponent;