import React, { Fragment } from "react";
import HeroText from "./HeroText";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar, Container, Nav } from "react-bootstrap";
import Cart from "../Cart/Cart";
import "./MyNavbar.css";
const MyNavbar = () => {
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
                end
              >
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }
                end
              >
                Store
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }
                end
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
            <Cart />
          </Nav>
        </Container>
      </Navbar>
      <HeroText />
    </Fragment>
  );
};

export default MyNavbar;
