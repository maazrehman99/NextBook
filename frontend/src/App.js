import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Example static product data
  const mockProducts = [
    { id: 1, name: "Manga Book 1", category: "manga" },
    { id: 2, name: "Fiction Book 1", category: "fiction" },
    { id: 3, name: "Biography Book 1", category: "biography" },
  ];

  const fetchProducts = async () => {
    // Mock fetching products
    setProducts(mockProducts);
  };

  const fetchMangaProducts = () => {
    setMangaProducts(mockProducts.filter(product => product.category === "manga"));
  };

  const fetchFictionProducts = () => {
    setFictionProducts(mockProducts.filter(product => product.category === "fiction"));
  };

  const fetchBioProducts = () => {
    setBioProducts(mockProducts.filter(product => product.category === "biography"));
  };

  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    fetchProducts();
    fetchMangaProducts();
    fetchFictionProducts();
    fetchBioProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Router>
            <div style={{ display: "flex" }}>
              <CssBaseline />
              <Navbar
                totalItems={cart.length}
                handleDrawerToggle={handleDrawerToggle}
              />
              <Switch>
                <Route exact path="/">
                  <Products
                    products={products}
                    featureProducts={featureProducts}
                    onAddToCart={handleAddToCart}
                  />
                </Route>
                <Route exact path="/cart">
                  <Cart
                    cart={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout cart={cart} order={order} />
                </Route>
                <Route path="/product-view/:id" exact>
                  <ProductView />
                </Route>
                <Route path="/manga" exact>
                  <Manga
                    mangaProducts={mangaProducts}
                    onAddToCart={handleAddToCart}
                  />
                </Route>
                <Route path="/fiction" exact>
                  <Fiction
                    fictionProducts={fictionProducts}
                    onAddToCart={handleAddToCart}
                  />
                </Route>
                <Route path="/biography" exact>
                  <Biography
                    bioProducts={bioProducts}
                    onAddToCart={handleAddToCart}
                  />
                </Route>
              </Switch>
            </div>
          </Router>
          <Footer />
        </>
      ) : (
        <div className="loader">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default App;
