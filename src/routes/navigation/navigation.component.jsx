import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
//import { UserContext } from '../../contexts/user.context';

import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  //const { currentUser } = useContext(UserContext);
  //const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          
          {currentUser ? (
            <NavLink as='span'  onClick={signOutHandler}> SIGN OUT</NavLink>
          ) : (
            <NavLink to="/auth">
              Sign In
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;