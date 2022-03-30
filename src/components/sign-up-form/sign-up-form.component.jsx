import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] =useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(name, value);
    setFormFields({ ...formFields, [name]: value });
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // means you want to handle everything that happens onSubmission of the form
    if(confirmPassword !== password) {
      alert("Password mismatch")
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      // create user document from auth
    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      } else {
        console.log('user creation encountered error', err);
      }
    }
    // confirm password matches
    // see if user is authenticated with email and Password
    // create user document
  }

  return (
    <div className='sign-up-container'>
    <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Display Name" type="text" onChange={handleChange}name="displayName" value={displayName} required 
        />
        <FormInput 
          label="Email" type="email" onChange={handleChange} name="email" value={email} required 
        />
        <FormInput 
          label="Password" type="password" onChange={handleChange} name="password" value={password} required 
        />
        <FormInput 
          label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required 
        />

        <Button type="submit" onChange={handleChange}> Sign Up </Button>
      </form>
    </div>
  )
}

export default SignUpForm;