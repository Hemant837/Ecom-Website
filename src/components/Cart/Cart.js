import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const cartElements = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
];

const Cart = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalItems = cartElements.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartElements.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Button variant="outline-info" onClick={handleShow}>
        Cart <Badge bg="secondary">{totalItems}</Badge>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartElements.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        width={70}
                        height={70}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>Rs.{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button variant="danger">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-right">
              <strong>Total: Rs. {totalPrice}</strong>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
