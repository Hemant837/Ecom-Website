import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

const Product = (props) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mb-4 text-center">
          <div className="product">
            <Image src={props.item.imageUrl} rounded fluid />
            <h4>{props.item.title}</h4>
            <p>Rs. {props.item.price}</p>
            <Button variant="primary">Add to Cart</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
