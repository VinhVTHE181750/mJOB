import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useBalance } from "../../../hooks/payment/useBalance";

const Balance = ({ amount = 0, currency = "USD", locale = "en-US" }) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(amount);
};

export default Balance;
