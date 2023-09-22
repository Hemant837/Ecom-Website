import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
      <Row className="align-items-center justify-content-center my-4 text-center">
        <Col xs={6} sm={4} md={3} lg={2}>
          <Image src={props.item.imageUrl} rounded fluid />
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <h6 className="text-dark">{props.item.title}</h6>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <p>Rs. {props.item.price}</p>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <div className="d-flex flex-column align-items-center">
            <Form>
              <InputGroup>
                <FormControl
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  style={{ maxWidth: "60px" }}
                />
              </InputGroup>
            </Form>
            <div className="d-flex mt-2">
              <Link to={`/products/${props.item.id}`} className="me-2">
                <Button variant="info">Buy</Button>
              </Link>
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
