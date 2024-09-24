import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./style.css";

// Function to handle dangerously set HTML markup
const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({
    name: "Sample Product",
    description: "This is a <strong>sample product</strong> description.",
    price: "$100",
    src: "https://via.placeholder.com/300" // Placeholder image
  });

  // You can replace this useEffect with an API call to fetch actual product data
  useEffect(() => {
    // Mock fetch or API logic for product data
    const fetchProduct = async () => {
      // Simulate fetching product data
      const productData = {
        name: "Sample Product",
        description: "This is a <strong>sample product</strong> description.",
        price: "$100",
        src: "https://via.placeholder.com/300"
      };
      setProduct(productData);
    };

    fetchProduct();
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={product.src} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b> {product.price} </b>
          </Typography>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
