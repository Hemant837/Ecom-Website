import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import CartContext from "../../../../store/cart-context";

const Product = (props) => {
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    cartCtx.addItem({
      ...props.item,
      quantity: quantity,
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mb-4 text-center">
          <div className="product">
            <Image src={props.item.imageUrl} rounded fluid />
            <h4>{props.item.title}</h4>
            <p>Rs. {props.item.price}</p>
            <Form>
              <InputGroup className="justify-content-center">
                <FormControl
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  style={{ maxWidth: "60px" }}
                  className="text-center"
                />
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
