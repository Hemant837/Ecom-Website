import React, { useContext, useEffect, lazy, Suspense } from "react";
import formatEmail from "./Functions/formatEmail";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import HomePage from "./components/pages/Home";
import Footer from "./components/Footer/Footer";
import CartContext from "./store/cart-context";

const Products = lazy(() => import("./components/pages/Products/Products"));
const AboutPage = lazy(() => import("./components/pages/About"));
const ContactUs = lazy(() => import("./components/pages/ContactUs"));
const ProductDetails = lazy(() =>
  import("./components/pages/Products/ProductDetails")
);
const LoginPage = lazy(() => import("./components/pages/LoginPage"));

const FallbackComponent = () => <div>Loading...</div>;

function App() {
  const authCtx = useContext(CartContext);

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    const authUser = async () => {
      try {
        const res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDxCMBQ3zSfjUbxgTU2ZRB8pvudw_zhoBk",
          { idToken: idToken }
        );
        authCtx.setUserIsLoggedIn();
        authCtx.setUserEmail(res.data.users[0].email);

        const { data } = await axios.get(
          `https://ecommerc-website-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
            res.data.users[0].email
          )}/cart/.json`
        );

        if (data) {
          const fetchedData = Object.keys(data).map((newDatas) => {
            return { firebaseId: newDatas, ...data[newDatas] };
          });
        
          authCtx.setCart(fetchedData);
        }
      
      } catch (error) {
        console.log(error);
      }
    };
    authUser();
  }, []);

  return (
    <Suspense fallback={<FallbackComponent />}>
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
    </Suspense>
  );
}

export default App;
