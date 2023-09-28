import React, { useState } from "react";
import CartContext from "./cart-context";
import axios from "axios";
import formatEmail from "../Functions/formatEmail";

const CartProvider = (props) => {
  const [items, setCartItems] = useState([]);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const addItemToCartHandler = async (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = items.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    // console.log(item);
    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedItems = [...items];
      const existingItem = updatedItems[existingItemIndex];

      // You can update the quantity based on your logic here
      existingItem.quantity += 1;

      setCartItems(updatedItems);

      try {
        const { data } = await axios.patch(
          `https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
            userEmail
          )}/cart/${existingItem.firebaseId}.json`,
          { quantity: existingItem.quantity }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // If the item is not in the cart, add it
      console.log(userEmail);
      try {
        const { data } = await axios.post(
          `https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
            userEmail
          )}/cart/.json`,
          item
        );
        const newItem = { firebaseId: data.name, ...item };
        const updatedItems = [...items, newItem];

        setCartItems(updatedItems);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeItemFromCartHandler = (id, firebaseId) => {
    // Find the index of the item to be removed
    const itemIndex = items.findIndex((cartItem) => cartItem.id === id);

    if (itemIndex !== -1) {
      // Create a copy of the items array
      const updatedItems = [...items];

      // Get the item to be removed
      const removedItem = updatedItems[itemIndex];

      // Decrement the quantity of the item
      removedItem.quantity = 0;

      // If the quantity reaches zero, remove the item from the array
      if (removedItem.quantity === 0) {
        updatedItems.splice(itemIndex, 1);
      }

      // Update the cart state with the updated items array
      setCartItems(updatedItems);

      // Update the cart data in Firebase database using fetch and PATCH method

      try {
        const { data } = axios.delete(
          `https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
            userEmail
          )}/cart/${firebaseId}.json`
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
  };
  const logoutHandler = () => {
    setToken(null);
    setUserIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const setUserEmailHandeler = (email) => {
    setUserEmail(email);
  };

  const setUserLoggedIn = () => {
    setUserIsLoggedIn(true);
  };

  const setCartHandler = (newItems) => {
    console.log(newItems);
    setCartItems(newItems);
  };

  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    token: token,
    isLoggedIn: userIsLoggedIn,
    setUserIsLoggedIn: setUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userEmail: userEmail,
    setUserEmail: setUserEmailHandeler,
    setCart: setCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
