import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import http from "../../functions/httpService";
import { BsCheck } from "react-icons/bs";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  if (content === "COMPLETED") {
    return <h3 className="text-center text-success"><BsCheck/> Deposited successfully.</h3>;
  }
  return <h3 className="text-center">{content}</h3>;
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
};

function PayPalComponent({ amount }) {
  const amountRef = useRef(amount);
  const initialOptions = {
    "client-id": "AdxQJndu_yQCm_pbmbE2BRfVwSsJ2qBQ8u_FAtm00QuS_uT0-Y1TzN7Lk5mb_SvJaXL52WYyJmWnbqWS",
    // "enable-funding": "venmo",
    "disable-funding": "venmo",
    // "country": "US",
    "currency": "USD",
    "data-page-type": "product-details",
    "components": "buttons",
    // "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "blue",
            label: "pay",
          }}
          createOrder={async () => {
            try {
              const response = await http.post("/payment/paypal/orders", {
                cart: [
                  {
                    id: "mJOB_DEPOSIT",
                    quantity: "1",
                    amount: {
                      currency_code: "USD",
                      value: amountRef.current,
                    },
                    // amount: amount,
                  },
                ],
              });

              const orderData = await response.data;

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              setMessage(`Could not initiate PayPal Checkout...`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await http.post(`/payment/paypal/orders/${data.orderID}/capture`, {});

              const orderData = await response.data;
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(transaction.status);
                // console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
              }
            } catch (error) {
              setMessage(`Sorry, your transaction could not be processed...`);
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

PayPalComponent.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default PayPalComponent;
