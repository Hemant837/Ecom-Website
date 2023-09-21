import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setCartItems] = useState([]);

  const addItemToCartHandler = (item) => {
    setCartItems([...items, item]);

    const updatedItemsArray = [...items];
    const existingItemIndex = updatedItemsArray.find(
      (existingItem) => existingItem.id === item.id
    );

    existingItemIndex
      ? (existingItemIndex.quantity += Number(item.quantity))
      : updatedItemsArray.push(item);

    setCartItems(updatedItemsArray);
  };

  const removeItemFromCartHandler = (id) => {
    const updatedItemsArray = [...items];
    const itemIndex = updatedItemsArray.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // This is the copy of the item
      const updatedItem = { ...updatedItemsArray[itemIndex] };

      // Here we are Decrement the quantity of the item by 1
      updatedItem.quantity = updatedItem.quantity - 1;

      if (updatedItem.quantity === 0) {
        // Here if the quantity reaches zero, remove the item from the array
        updatedItemsArray.splice(itemIndex, 1);
      } else {
        // Updating the item in the array with the updated item
        updatedItemsArray[itemIndex] = updatedItem;
      }

      // Updating the state with the new items array
      setCartItems(updatedItemsArray);
    }
  };

  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
