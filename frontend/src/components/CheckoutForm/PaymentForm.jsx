import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import Review from "./Review";

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // You can replace this part with your payment processing logic
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "International",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "none", // Change as necessary
      },
    };

    // Simulate capturing checkout
    onCaptureCheckout(checkoutToken.id, orderData);

    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Here you can replace CardElement with your own payment method input */}
        <div style={{ margin: "20px 0" }}>
          <Typography variant="body1">Payment method placeholder</Typography>
          {/* You can add your custom payment fields here */}
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#001524", color: "#FFFF" }}
          >
            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
