import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CartContext from "../../../store/cart-context";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const cartCtx = useContext(CartContext);
  const handleAddToCart = () => {
    cartCtx.addItem({
      id: product.id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
  };

  const products = useMemo(
    () => [
      {
        id: "a1",
        title: "Colors",
        price: 100,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        description: "Product description goes here.",
        reviews: ["Great product!", "High quality."],
        rating: 4.5,
      },
      {
        id: "a2",
        title: "Black and white Colors",
        price: 50,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
        description: "Another product description.",
        reviews: ["Awesome product!", "Affordable price."],
        rating: 3.8,
      },
      {
        id: "a3",
        title: "Yellow and Black Colors",
        price: 70,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        description: "Product description goes here.",
        reviews: ["Excellent!", "Great value for money."],
        rating: 4.0,
      },
      {
        id: "a4",
        title: "Blue Color",
        price: 100,
        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
        description: "Product description goes here.",
        reviews: ["Very satisfied!", "Beautiful color."],
        rating: 4.7,
      },
    ],
    []
  );

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);
    setProduct(selectedProduct);
  }, [productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={product.imageUrl} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">{product.title}</h2>

              <p className="mb-3">
                <strong>Price:</strong> Rs. {product.price}
              </p>
              <div className="d-flex align-items-center my-3">
                <span className="mr-2">
                  <strong>Rating:</strong> {product.rating.toFixed(1)}
                </span>
              </div>
              <p className="mb-3">{product.description}</p>
              <h3 className="mb-3">Product Reviews:</h3>
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>

              <Button variant="success">Buy Now</Button>
              <Button
                variant="primary"
                className="mx-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
