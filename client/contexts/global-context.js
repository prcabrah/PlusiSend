import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAddress, useBalance, useMetamask, useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const address = useAddress();
  const sdk = useSDK();

  const router = useRouter();

  async function init() {
    if (window.ethereum === undefined) {
      console.error("No ethereum object found");

      alert(
        "No Ethereum provider found! Please install a wallet extension like MetaMask or use brave browser and setup a wallet"
      );
      router.pathname !== "/" && router.push("/");
      return null;
    }
  }

  useEffect(() => {
    let isMounted = true;

    init();

    return () => {
      isMounted = false;
    };
  }, [router.pathname, address]);

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      address
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, address]);

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
