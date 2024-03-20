import { createContext, useState, useEffect, Children } from "react";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, id) => {
    const newItem = { ...product, quantity: 1 };
    //checking if item exists in cart or not
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) return { ...item, quantity: cartItem.quantity + 1 };
        else return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
