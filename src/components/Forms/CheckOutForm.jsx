import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./Common.css";

import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ refetch, closeModal, campFees, camp }) => {
    const { _id,  ...newData } = camp;
    // console.log(newData);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    getPaymentIntent();
  }, [campFees]);
  const getPaymentIntent = async () => {
   if(campFees){
    try {
     
      const { data } = await axiosSecure.post("/create-payment-intent", {
       fees: campFees
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast.error(error)
    }  
  
   }
     
   
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
  

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {

      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {

    return  console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: camp?.participant?.name,
          email: camp?.participant?.email,
        },
      },
    });
    if (paymentIntent.status === "succeeded") {
      try {
        const payment = {
            email: camp?.participant?.email,
            name: camp?.participant?.name,
            transactionId : paymentIntent.id,
            campName: camp?.campName,
            campFees,
            paymentStatus: 'Paid',
            confirmStatus: 'Pending',
        }
      await axiosSecure.post(`/payments`, payment);
         await axiosSecure.patch(
          `/update-status/${camp._id}`,
          {  status: "Paid"  }
        );
        toast.success(`Your Transaction Id ${paymentIntent.id} payment successfully`);
        navigate("/dashboard/history");
        refetch();
      } catch (error) {
        toast.error(error.message);
      } finally {
        closeModal();
      
      }
    }
  };
  // console.log(clientSecret);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex gap-1 items-center">
        <button
          type="submit"
          disabled={!stripe || !clientSecret } className="bg-primary px-3 py-1 rounded-md text-white"
          
        >Pay Now</button>
        <button onClick={closeModal} className="bg-myAccent text-primary px-3 py-1 rounded-md">Cancel</button>
      </div>
    </form>
  );
};
export default CheckoutForm;
