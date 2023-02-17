import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser)
  const [ isProcessingPayment, setIsProcesssingPayment ] = useState(false);

  const paymentHandler = async(e) => {
    e.preventDefault();

    if(!stripe || !elements) return;
    
    setIsProcesssingPayment(true);
    const response = await fetch('/.netlify/functions/create-payment-intent',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(res => res.json());
    //client secret from responce is the handshake token for a payment with a particular intent
    const { paymentIntent: { client_secret:clientSecret } } = response;
    
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        }
      }
    });
    setIsProcesssingPayment(false);
    if(paymentResult.error){
      alert(paymentResult.error)
    } else {
      if(paymentResult.paymentIntent.status === "succeeded"){
        alert("payment successful")
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2> Credit Card Payment </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;