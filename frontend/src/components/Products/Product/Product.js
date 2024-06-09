import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';  // Import the half-star icon
import StarBorderIcon from '@material-ui/icons/StarBorder'; // Import the border star icon

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  starIcon: {
    color: "#FFD700", // Yellow color for filled stars
  },
}));

const Product = ({ book }) => {
  const classes = useStyles();

  // Function to generate stars based on the rating
  const renderStars = (rating) => {
    const normalizedRating = rating / 2; // Map [1, 10] to [0, 5]
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(normalizedRating)) {
        stars.push(<StarIcon key={`star-${i}`} className={classes.starIcon} />);
      } else if (i === Math.floor(normalizedRating) && normalizedRating % 1 !== 0) {
        stars.push(<StarHalfIcon key={`star-${i}`} className={classes.starIcon} />);
      } else {
        stars.push(<StarBorderIcon key={`star-${i}`} />);
      }
    }
  
    return stars;
  };
  

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={book[2]} // Assuming the image URL is at index 2 in the array
        title={book[0]} // Assuming the title is at index 0 in the array
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {book[0]} {/* Title */}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h3">
          <span style={{ fontWeight: "bold" }}>{book[1]}</span> {/* Author in bold */}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating: {book[3].toFixed(2)} {/* Rating formatted with two decimal points */}
        </Typography>
        <div> {/* Render stars on a new line */}
          {renderStars(book[3])}
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
