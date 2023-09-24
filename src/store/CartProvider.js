import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setCartItems] = useState([]);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(null);
  const userIsLoggedIn = !!token;

  const addItemToCartHandler = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = items.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedItems = [...items];
      const existingItem = updatedItems[existingItemIndex];

      // You can update the quantity based on your logic here
      existingItem.quantity += 1;

      setCartItems(updatedItems);
    } else {
      // If the item is not in the cart, add it
      const updatedItems = [...items, item];

      setCartItems(updatedItems);
    }

    // Now, you can also update the cart data in your Firebase database using fetch
    const cartData = {
      items: items, // You may want to send the updated items
    };

    fetch(`https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${userEmail}.json`, {
      method: "PATCH",
      body: JSON.stringify(cartData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating cart data");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, such as network issues or Firebase rules violations
        console.error("Error updating cart data:", error);
      });
  };
  
  const removeItemFromCartHandler = (id) => {
    // Find the index of the item to be removed
    const itemIndex = items.findIndex((cartItem) => cartItem.id === id);
  
    if (itemIndex !== -1) {
      // Create a copy of the items array
      const updatedItems = [...items];
  
      // Get the item to be removed
      const removedItem = updatedItems[itemIndex];
  
      // Decrement the quantity of the item
      removedItem.quantity -= 1;
  
      // If the quantity reaches zero, remove the item from the array
      if (removedItem.quantity === 0) {
        updatedItems.splice(itemIndex, 1);
      }
  
      // Update the cart state with the updated items array
      setCartItems(updatedItems);
  
      // Now, you can also update the cart data in your Firebase database using fetch and PATCH method
      const cartData = {
        items: updatedItems, // Send the updated items array
      };
  
      fetch(`https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${userEmail}.json`, {
        method: "PATCH",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error updating cart data");
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error updating cart data:", error);
        });
    }
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const setUserEmailHandeler = (email) => {
    setUserEmail(email);
  };

  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userEmail: userEmail,
    setUserEmail: setUserEmailHandeler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
