import './button.styles.scss';
/**Three types of buttons in our project: button
 * Default
 * Inverted
 * Google sign in
*/

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
      {...otherProps}
    >{children}
    </button>
  )
}

export default Button;