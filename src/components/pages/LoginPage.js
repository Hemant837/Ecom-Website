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
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxCMBQ3zSfjUbxgTU2ZRB8pvudw_zhoBk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxCMBQ3zSfjUbxgTU2ZRB8pvudw_zhoBk";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
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
        // Update the user's authentication token
        authCtx.setUserIsLoggedIn();
        console.log(data);
        authCtx.login(data.idToken);
        authCtx.setUserEmail(enteredEmail);
        // Redirect the user to the desired route
        history.replace("/products");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container className="mt-5 mb-4">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">{isLogin ? "Login" : "Sign Up"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={emailInputRef}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={passwordInputRef}
              />
            </Form.Group>
            {!isLoading && (
              <Button variant="primary" type="submit" className="mx-2">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            )}
            {isLoading && (
              <p className="text-center text-primary">Sending Request...</p>
            )}
            <Button variant="primary" onClick={switchAuthModeHandler}>
              {isLogin
                ? "Create new account"
                : "Login with an existing account"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
