import React from "react";
import { Container } from "react-bootstrap";

const HeroText = (props) => {
  return (
    <Container
      style={{ height: "250px", fontSize: "36px", fontWeight: "bold" }}
      fluid
      className="d-flex align-items-center justify-content-center bg-secondary"
    >
      <div className="hero-text">
        The Generic
      </div>
    </Container>
  );
};

export default HeroText;
