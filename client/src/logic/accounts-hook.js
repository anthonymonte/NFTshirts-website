import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";


const useAccounts = () => {
  const [accounts, setAccounts] = useState();
  const options = useSDK();

  useEffect(() => {
    options.sdk?.connect()
    .then(setAccounts)
  }, 
  [options]
  );

  return { accounts, ...options };
}

export default useAccounts;