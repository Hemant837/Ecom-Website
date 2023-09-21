import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <Container fluid className="bg-primary text-white p-4">
      <Row>
        <Col className="text-center">
          <h2>The Generic</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
