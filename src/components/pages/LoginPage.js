import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";

const LoginPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(CartContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoding] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entertedEmail = emailInputRef.current.value;
    const entertedPassword = passwordInputRef.current.value;
    setIsLoding(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxCMBQ3zSfjUbxgTU2ZRB8pvudw_zhoBk";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: entertedEmail,
        password: entertedPassword,
        returnSecureToken: true,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoding(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container className="mt-5 mb-4">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-2">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
            </Form.Group>
            {isLoading && (
              <p className="text-center text-primary">Sending Request...</p>
            )}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
