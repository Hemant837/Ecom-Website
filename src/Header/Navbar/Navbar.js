import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import { Navbar, Container, Nav } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import HeroImage from "../HeroImage/HeroImage";

const MyNavbar = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#store">Store</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-info">
              cart <Badge bg="secondary">0</Badge>
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <HeroImage />
    </Fragment>
  );
};

export default MyNavbar;
