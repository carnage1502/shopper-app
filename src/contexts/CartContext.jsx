import { createContext, useState, useEffect, Children } from "react";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //amount state
  const [itemAmount, setItemAmount] = useState(0);

  //total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  });

  //update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

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

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  //increase quantity of item in cart
  const increaseQuantity = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };
  //decrease quantity of item in cart
  const decreaseQuantity = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) return { ...item, quantity: cartItem.quantity - 1 };
        else return item;
      });
      setCart(newCart);
    }
    if (cartItem.quantity < 2) removeFromCart(id);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
