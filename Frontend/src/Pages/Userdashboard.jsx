import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Userdashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/movies');
        setMovies(response.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#121212">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#121212">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={3} marginTop={10} bgcolor="#121212" minHeight="100vh">
      <Typography variant="h4" align="left" gutterBottom sx={{ color: '#FFC107' }}>
      
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {movies.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ color: '#fff' }}>
            No movies found
          </Typography>
        ) : (
          movies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  bgcolor: '#1e1e1e',
                  color: '#fff',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s',
                  ':hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={movie.image}
                  alt={movie.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#FFC107' }}>
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                    Category: {movie.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                    Languages: {movie.languages.join(', ')}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button
                      component={Link}
                      to={`/movies/${movie._id}`}
                      variant="outlined"
                      sx={{
                        borderColor: '#FFC107',
                        color: '#FFC107',
                        ':hover': { borderColor: '#FFD54F', color: '#FFD54F' },
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#FFC107',
                        color: '#000',
                        ':hover': { bgcolor: '#FFD54F' },
                      }}
                      onClick={() => handleNavigation(`/movies/${movie._id}/write-review`)}
                    >
                      Write a Review
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Userdashboard;
