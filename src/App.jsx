import Cart from "./assets/Components/Cart.jsx";
import Header from "./assets/Components/Header.jsx";
import Meals from "./assets/Components/Meals.jsx";
import Order from "./assets/Components/Order.jsx";

import { CartContntextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContntextProvider>
          <Header />
          <Meals />
          <Cart />
          <Order />
        </CartContntextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
