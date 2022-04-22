import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
//import { UserContext } from '../../contexts/user.context';
import { 
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.component.scss'

const defaultFields = {
  email: '', 
  password: '',
}

const SignInForm = () => {
  const [signInFields, setSignInFields] = useState(defaultFields);
  const { email, password } = signInFields;

  //const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async() => {
    await signInWithGooglePopup();
  }

  const resetSignInFields = () => {
    setSignInFields(defaultFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFields({...signInFields, [name]: value});
    //console.log(signInFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user); // removed because of firebase auth change listener
      resetSignInFields();
    } catch(error) {
      // console.log({ error })
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user not found':
          alert('no such user with this email');
          break;
        default:
          console.log({error});
      }
    }
  }
  
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Email" type="email" onChange={handleChange} name="email" value={email} required 
        />
        <FormInput 
          label="Password" type="password" onChange={handleChange} name="password" value={password} required 
        />
        <div className="buttons-container">
          <Button type="submit"> Sign In </Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}> 
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;