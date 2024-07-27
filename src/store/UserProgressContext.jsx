import { createContext, useState } from "react";

const UserProgresContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setProgress] = useState("");

  const showCart = () => {
    setProgress("cart");
  };

  const hideCart = () => {
    setProgress("");
  };

  const showCheckout = () => {
    setProgress("checkout");
  };

  const hideCheckout = () => {
    setProgress("");
  };

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgresContext.Provider value={userProgressCtx}>
      {children}
    </UserProgresContext.Provider>
  );
}

export default UserProgresContext;
