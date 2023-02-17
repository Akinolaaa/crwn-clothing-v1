import './product-card.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CategoryItem } from '../../store/categories/category.types'
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

type ProductCardProps = {
  product:CategoryItem;
}

const ProductCard = ({product}:ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;
  //const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
    //console.log(cartItems);
  }

  return(
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}

export default ProductCard;