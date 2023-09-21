import React from "react";
import HeaderNav from "./components/Header/Navbar/Navbar";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import CartProvider from "./store/CartProvider";

function App() {
  return (
    <CartProvider>
      <HeaderNav />
      <Products />
      <Footer />
    </CartProvider>
  );
}

export default App;
