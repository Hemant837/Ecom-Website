import React, { Fragment } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import HeroText from "../HeroText/HeroText";
import Cart from "../../Cart/Cart";

const MyNavbar = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#store">Store</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
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
