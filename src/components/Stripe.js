import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PDqkvSFbV9kK8wdmkUeKTZnOgY1aJi3cp1UiVRvcNCmWJLv50il5kOdJgYbbSCFF3Eodnilbq2EbjQvvSbJjnmm00f1JeP9Za:'); // Replace 'your_publishable_key' with your actual Stripe public key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(''); // New state for handling the UI feedback

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
      setPaymentStatus('failure'); // Set payment status to failure on error
    } else {
      console.log(result.token);
      // Assume payment processing is done here, set payment status to success
      setPaymentStatus('success'); // Simulating successful payment
      // Normally, you would send the result.token to your server here to process the payment
    }
  };

  return (
    <>
      {paymentStatus === '' && (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      )}
      {paymentStatus === 'success' && <p>Thank you for your purchase!</p>}
      {paymentStatus === 'failure' && <p>Your payment could not be completed. Please try again.</p>}
    </>
  );
};

const StripeContainer = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;
