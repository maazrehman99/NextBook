// api.js
import axios from 'axios';

const DEVELOPMENT_BACKEND_URL = "http://localhost:5000"; // Example, replace with your development backend URL

// Use the environment variable for production URL
const PRODUCTION_BACKEND_URL = process.env.REACT_APP_PROD_BACKEND_URL;

const getBackendUrl = () => {
  
  if (process.env.REACT_APP_ENV === "production") {
    return PRODUCTION_BACKEND_URL;
  } else {
    return DEVELOPMENT_BACKEND_URL;
  }
};

export const fetchTopBooks = async () => {
  const url = `${getBackendUrl()}/top_books`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching top books:", error);
    throw error;
  }
};

export const searchRecommendations = async (searchTerm) => {
  const url = `${getBackendUrl()}/recommend?book=${searchTerm}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
