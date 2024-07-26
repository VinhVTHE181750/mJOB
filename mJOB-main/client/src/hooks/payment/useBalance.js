import { useEffect, useState } from "react";

const useBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch balance from the server
    
    // mock
    setBalance(Math.random() * 100000 + 100000);
  }, []);

  return { balance };
};

export { useBalance };
