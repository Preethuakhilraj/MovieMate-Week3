import  { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false); // State to control the add/edit dialog
  const [isEdit, setIsEdit] = useState(false); // State to check if we are in edit mode
  const [currentMovie, setCurrentMovie] = useState({}); // State to store the current movie data

  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movies from the API
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/movies');
      setMovies(response.data || []);  // Ensure movies is an array
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle opening the add/edit movie dialog
  const handleOpenDialog = (movie = {}) => {
    setCurrentMovie(movie);  // Set current movie data (empty object for adding a new movie)
    setIsEdit(!!movie._id);  // Check if it's edit mode based on whether movie has an id
    setOpen(true);  // Open the dialog
  };

  // Handle closing the add/edit movie dialog
  const handleCloseDialog = () => {
    setOpen(false);  // Close the dialog
    setCurrentMovie({});  // Reset current movie data
  };

  // Handle submitting the add/edit movie form
  const handleSubmit = async () => {
    if (isEdit) {
      // Edit Movie
      try {
        await axios.put(`http://localhost:3000/user/movies/${currentMovie._id}`, currentMovie);
        alert('Movie updated successfully');
      } catch (error) {
        console.error('Error updating movie:', error);
      }
    } else {
      // Add New Movie
      try {
        await axios.post('http://localhost:3000/user/movies', currentMovie);
        alert('Movie added successfully');
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    }
    fetchMovies();  // Refresh the movie list
    handleCloseDialog();  // Close the dialog
  };

  // Handle deleting a movie
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/movies/${id}`);
      alert('Movie deleted successfully');
      fetchMovies(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  // Handle changes in the input fields of the dialog
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMovie({ ...currentMovie, [name]: value });  // Update the current movie data
  };

  return (
    <div style={{ marginTop: '120px', position: 'relative' }}>
      <h1>Admin Dashboard</h1>

      {/* Add Movie Button in the top right corner */}
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'absolute', right: '20px', top: '10px' }}
        onClick={() => handleOpenDialog()}
      >
        Add Movie
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Movie Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell>Tickets Sold/Day</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie._id}>
              <TableCell>
                <img src={movie.image} alt={movie.name} style={{ width: '100px' }} />
              </TableCell>
              <TableCell>{movie.name}</TableCell>
              <TableCell>{movie.category}</TableCell>
              <TableCell>{movie.languages.join(', ')}</TableCell>
              <TableCell>{movie.averageRating.toFixed(1)}</TableCell>
              <TableCell>{movie.ticketsSoldPerDay}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog(movie)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteMovie(movie._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Movie Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Movie Name"
            name="name"
            value={currentMovie.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={currentMovie.category || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Languages (comma-separated)"
            name="languages"
            value={currentMovie.languages ? currentMovie.languages.join(', ') : ''}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, languages: e.target.value.split(',').map(lang => lang.trim()) })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Average Rating"
            name="averageRating"
            type="number"
            value={currentMovie.averageRating || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tickets Sold/Day"
            name="ticketsSoldPerDay"
            type="number"
            value={currentMovie.ticketsSoldPerDay || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
