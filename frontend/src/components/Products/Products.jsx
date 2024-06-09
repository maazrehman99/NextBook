import React, { useState, useRef, useEffect } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import logo1 from "../../assets/Bookshop.gif";
import scrollImg from "../../assets/scroll.gif";
import axios from 'axios';

const Products = ({ onAddToCart }) => {
  const classes = useStyles();
  const sectionRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [topBooks, setTopBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch top books from the API when component mounts
    axios.get("http://127.0.0.1:5000/top_books")
      .then(response => {
        setTopBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching top books:", error);
      });
  }, []);

  const handleInputClick = () => {
    // Scroll to the section when the input field is clicked
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = () => {
    // Hit the recommend API when user presses enter or clicks search icon
    if (searchTerm !== "") {
      axios.get(`http://127.0.0.1:5000/recommend?book=${searchTerm}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
        });
    }
  };

  const handleKeyPress = (event) => {
    // Call handleSearch function when user presses enter
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <img src={scrollImg} className={classes.scrollImg} alt="Scroll" />
      <div className={classes.hero}>
        <img className={classes.heroImg} src={logo1} alt="Bookshop Logo" height="720px" />
        <div className={classes.heroCont}>
          <h1 className={classes.heroHeader}>
            Discover Your Next Favorite Book Here.
          </h1>
          <h3 className={classes.heroDesc} ref={sectionRef}>
            Explore our curated collection of new and popular books to find your
            next literary adventure.
          </h3>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Looking For Book Recommendations? "
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              onKeyPress={handleKeyPress} // Call handleSearch on key press
              startAdornment={
                <InputAdornment position="start" onClick={handleSearch}> {/* Bind handleSearch to onClick event */}
                  <SearchIcon /> {/* Removed onClick event from here */}
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>

      <div>
      <h3 className={classes.contentHeader}>
  {searchResults.length > 0 ? 
    <span>Recommendations For <span style={{ color: "#f1361d" }}>{searchTerm}</span></span>  :
    <span>Top <span style={{ color: "#f1361d" }}>Books</span></span>
  }
</h3>
<p className={classes.contentParagraph}>
  {searchResults.length > 0 ? 
    <span>These are top 4 best recommendations</span>  :
    <span>These are the top 30 books based on ratings by good readers</span>
  }
</p>



        <Grid
          className={classes.contentFeatured}
          container
          justify="center"
          spacing={1}
        >
          {searchResults.length > 0 ? searchResults.map((book, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <Product book={book} onAddToCart={onAddToCart} />
            </Grid>
          )) : topBooks.map((book, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <Product book={book} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
};

export default Products;
