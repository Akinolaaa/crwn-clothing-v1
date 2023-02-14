import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import './sign-in-form.component.scss'

const defaultFields = {
  email: '', 
  password: '',
}

const SignInForm = () => {
  const [signInFields, setSignInFields] = useState(defaultFields);
  const { email, password } = signInFields;
  const dispatch = useDispatch();
  //const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async() => {
    dispatch(googleSignInStart());
  }

  const resetSignInFields = () => {
    setSignInFields(defaultFields);
  }

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInFields({...signInFields, [name]: value});
    //console.log(signInFields);
  }

  const handleSubmit = async (event:FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetSignInFields();
    } catch(error) {
      // console.log({ error })
      console.log('user sign in failed', error)
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