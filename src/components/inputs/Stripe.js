import React from "react";
import { injectStripe, CardElement } from "react-stripe-elements";

const CardInput = () => <CardElement />;

export default injectStripe(CardInput);
