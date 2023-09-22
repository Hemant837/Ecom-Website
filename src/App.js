import React from "react";
import { Route } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/pages/Home";
import Products from "./components/pages/Products/Products";
import AboutPage from "./components/pages/About";
import ContactUs from "./components/pages/ContactUs";

function App() {
  return (
    <CartProvider>
      <MyNavbar />
      <main>
      <Route path="/home">
          <HomePage />
        </Route>
        
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/contactUs">
          <ContactUs />
        </Route>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
