import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import CartContext from "../../store/cart-context";

const Cart = () => {
  const itemCtx = useContext(CartContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalItems = itemCtx.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = itemCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (item, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    itemCtx.updateItemQuantity(item, newQuantity);
  };

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
                </tr>
              </thead>
              <tbody>
                {itemCtx.items.map((item, index) => (
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
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          style={{ maxWidth: "40px", marginRight: "8px" }}
                          onChange={(event) =>
                            handleQuantityChange(item, event)
                          }
                        />
                        <Button
                          variant="danger"
                          className="p-1"
                          onClick={() => itemCtx.removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
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
