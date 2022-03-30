import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Button from '../../components/button/button.component'
import { 
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {

  const logGoogleUser = async() => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  }
  // const logGoogleRedirectUser = async() => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user)
  // }
  return (
    <div>
      <h1> This is the sign isn page</h1>
      <Button onClick={logGoogleUser} buttonType='google'> Sign in with google popup</Button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;