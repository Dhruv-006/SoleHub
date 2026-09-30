import { useState, useEffect } from 'react';

const CART_KEY = 'solehub_cart';

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const addToCart = (product, size, quantity = 1) => {
    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.size === size
    );

    let newCart = [...cart];
    if (existingIndex >= 0) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        size,
        quantity
      });
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId, size) => {
    const newCart = cart.filter(
      item => !(item.productId === productId && item.size === size)
    );
    saveCart(newCart);
  };

  const updateQuantity = (productId, size, quantity) => {
    const newCart = cart.map(item => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };
}
