import React, { Fragment, useContext, useEffect } from "react";
import HeroText from "./HeroText";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import LoginButton from "../UI/Button/Button";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";
import "./MyNavbar.css";

const MyNavbar = () => {
  const ctx = useContext(CartContext);

  const isLoggedIn = ctx.isLoggedIn;
  const logoutHandler = () => {
    ctx.logout();
    console.log(isLoggedIn);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const logoutTimer = setTimeout(() => {
        ctx.logout();
      }, 30000000);
      return () => clearTimeout(logoutTimer);
    }
  }, [isLoggedIn, ctx]);

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }
              >
                Home
              </NavLink>
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "active-link" : undefined
                  }
                >
                  Products
                </NavLink>
              </Nav.Link>
            )}
            <Nav.Link>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }
              >
                About
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }
              >
                Contact us
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <NavLink to="/loginPage">
                <LoginButton />
              </NavLink>
            )}
            {isLoggedIn && (
              <Button
                variant="outline-info"
                className="mx-2"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            )}
            <Cart />
          </Nav>
        </Container>
      </Navbar>
      <HeroText />
    </Fragment>
  );
};

export default MyNavbar;
