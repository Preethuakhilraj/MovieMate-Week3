import { useState } from "react";  
import { Box, Button, TextField, Typography, Rating, CircularProgress } from "@mui/material";
import axiosInstance from "../Pages/axiosinterceptor";
import { useNavigate, useParams } from "react-router-dom";

const WriteReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false); // For handling loading state
  const { id: movieId } = useParams(); // Movie ID from URL
const navigate= useNavigate()
  const handleSubmitReview = async () => {
    setLoading(true);
  
    try {
      // Get the user from localStorage
      const storedUser = localStorage.getItem('user');
      
      // Check if storedUser exists and is not "undefined"
      if (!storedUser || storedUser === "undefined") {
        alert("Please log in to submit a review.");
        setLoading(false);
        return;
      }
  
      // Parse user data once
      const parsedUser = JSON.parse(storedUser);
      
      // Check if userId exists in parsed user data
      if (!parsedUser.userId) {
        alert("Invalid user data. Please log in again.");
        setLoading(false);
        return;
      }
  
      const userId = parsedUser.userId;
  
      // Validate reviewText and rating
      if (!reviewText.trim()) {
        alert("Please enter a review.");
        setLoading(false);
        return;
      }
  
      if (rating === 0) {
        alert("Please provide a rating.");
        setLoading(false);
        return;
      }
  
      // Make POST request to submit the review
      const response = await axiosInstance.post(`/user/movies/${movieId}/review`, {
        userId,
        review: reviewText,
        rating,
      });
  
      console.log("Review submitted successfully:", response.data);
      alert("Review submitted successfully!");
      navigate('/userdashboard')
      // Reset review form
      setReviewText("");
      setRating(0);
  
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit the review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      padding={3}
      bgcolor="#121212"
      borderRadius={2}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      minWidth="300px"
      marginTop={10}
    >
      <Typography variant="h6" color="#FFC107" gutterBottom>
        Write a Review
      </Typography>
      <TextField
        fullWidth
        label="Your Review"
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{
          marginBottom: 2,
          backgroundColor: '#1e1e1e',
          borderRadius: 1,
          '& .MuiInputBase-root': { color: '#fff' },
          '& .MuiInputLabel-root': { color: '#BDBDBD' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFC107' },
        }}
      />
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Rating
          name="movie-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          precision={0.5}
          sx={{ color: '#FFC107' }}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmitReview}
        disabled={loading}
        sx={{
          bgcolor: '#FFC107',
          color: '#000',
          '&:hover': { bgcolor: '#FFD54F' },
          width: '100%',
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
      </Button>
    </Box>
  );
};

export default WriteReview;
