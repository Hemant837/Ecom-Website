import React, { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/pages/Home";
import Products from "./components/pages/Products/Products";
import AboutPage from "./components/pages/About";
import ContactUs from "./components/pages/ContactUs";
import ProductDetails from "./components/pages/Products/ProductDetails";
import LoginPage from "./components/pages/LoginPage";
import CartContext from "./store/cart-context";

function App() {
  const authCtx = useContext(CartContext);

  return (
    <Fragment>
      <MyNavbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/products" exact>
            {authCtx.isLoggedIn && <Products />}
            {!authCtx.isLoggedIn && <Redirect to="/loginPage" />}
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
          {!authCtx.isLoggedIn && (
            <Route path="/loginPage">
              <LoginPage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
