import React, { useContext, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
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
      <Row className="justify-content-center align-items-center">
        <Col xs={4} md={2} className="mb-4 text-center">
          <Image src={props.item.imageUrl} rounded fluid />
          </Col>
        <Col xs={4} md={3}>
          <h6>{props.item.title}</h6>
          </Col>
        <Col xs={4} md={2}>
          <p>Rs. {props.item.price}</p>
          </Col>
        <Col xs={4} md={2}>
          <Form>
            <InputGroup>
              <FormControl
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
                style={{ maxWidth: "60px" }}
              />
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
