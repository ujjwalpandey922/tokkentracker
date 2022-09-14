import React from "react";
import { useContext, createContext, useState, useEffect } from "react";
const Crypto = createContext();

function CrypContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹"); //$
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

export default CrypContext;

export const CrypState = () => {
  return useContext(Crypto);
};
