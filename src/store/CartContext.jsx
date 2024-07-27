import { createContext, useReducer } from "react";

const CartContntext = createContext({
  items: [],
  handleAddItem: (item) => {},
  handleRemoveItem: (id) => {},
  handleClearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "AddItem") {
    const { item } = action;
    const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "removeItem") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCatItem = state.items[existingItemIndex];

    const updatedItems = [...state.items];

    if (existingCatItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCatItem,
        quantity: existingCatItem.quantity - 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "clearCart") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContntextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const cartContext = {
    items: cart.items,
    handleAddItem: (item) => dispatchCartAction({ type: "AddItem", item }),
    handleRemoveItem: (id) => dispatchCartAction({ type: "removeItem", id }),
    handleClearCart: () => dispatchCartAction({ type: "clearCart" }),
  };

  return (
    <CartContntext.Provider value={cartContext}>
      {children}
    </CartContntext.Provider>
  );
}

export default CartContntext;
