import { ButtonHTMLAttributes, FC } from 'react';
import {
  BaseButton, GoogleSignInButton, 
  InvertedButton, ButtonSpinner } from'./button.styles';
/**Three types of buttons in our project: button
 * Default
 * Inverted
 * Google sign in
*/

export enum BUTTON_TYPE_CLASSES {
  base= 'base',
  google= 'google-sign-in',
  inverted= 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base):typeof BaseButton => (
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

  }[buttonType]
);
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: BUTTON_TYPE_CLASSES,
  isLoading?: boolean,
}

//const Button = ({ children, buttonType, ...otherProps }:ButtonProps  => {
const Button:FC<ButtonProps> = ({ children, isLoading, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton disabled={isLoading} {...otherProps}> 
      { isLoading ? <ButtonSpinner /> : children } 
    </CustomButton>
  )
}

export default Button;