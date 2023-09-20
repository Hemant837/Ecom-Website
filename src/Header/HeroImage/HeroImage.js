import React from "react";
import { Container } from "react-bootstrap";


const HeroImage = (props) => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-secondary">
      <div className="hero-text">The Generic</div>
    </Container>
  );
};

export default HeroImage;