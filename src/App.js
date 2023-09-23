import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/pages/Home";
import Products from "./components/pages/Products/Products";
import AboutPage from "./components/pages/About";
import ContactUs from "./components/pages/ContactUs";
import ProductDetails from "./components/pages/Products/ProductDetails";
import LoginPage from "./components/pages/LoginPage";

function App() {
  return (
    <CartProvider>
      <MyNavbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/contactUs">
            <ContactUs />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route path="/loginPage">
            <LoginPage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
