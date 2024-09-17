import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from "@mui/material";
import axiosInstance from "../Pages/axiosinterceptor";
import moment from 'moment';

const ViewBookedTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        // Check if user exists and has an email
        if (user && user.email) {
          // Axios GET request to fetch booked tickets based on the user's email
          const response = await axiosInstance.get(`/user/booked-tickets?email=${user.email}`);
          setTickets(response.data); // Set the tickets data into state
          console.log(response.data); // For debugging
        } else {
          alert("User not found or not logged in.");
        }
      } catch (error) {
        // Enhanced error handling and logging
        if (error.response) {
          console.error("Response Error:", error.response.data);
          console.error("Response Status:", error.response.status);
          console.error("Response Headers:", error.response.headers);
        } else if (error.request) {
          console.error("No Response Error:", error.request);
        } else {
          console.error("Error Message:", error.message);
        }
        console.error("Error Config:", error.config);
      }
    };

    fetchTickets(); // Call the function to fetch tickets on component mount
  }, []);

  const handleCancelTicket = async (ticketId) => {
    try {
      // Ask for confirmation before cancelling the ticket
      const isConfirmed = window.confirm("Are you sure you want to cancel this ticket?");
      
      // Proceed only if the user confirms
      if (isConfirmed) {
        // Axios POST request to cancel the ticket
        await axiosInstance.post(`/user/cancel-ticket/${ticketId}`);
  
        // Update state by removing the canceled ticket from the list
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== ticketId));
  
        alert("Ticket cancelled successfully.");
      }
    } catch (error) {
      // Error handling for failed ticket cancellation
      console.error("Error cancelling ticket:", error);
      alert("Failed to cancel the ticket. Please try again.");
    }
  };
  

  return (
    <Box sx={{ marginTop: '150px', marginBottom: '200px', pt: '50' }}>
      <h2>Booked Tickets</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Seats</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket.movieId.name}</TableCell>
              <TableCell>{moment(ticket.bookingDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{ moment(ticket.bookingDate).format('hh:mm a')}</TableCell>
              <TableCell>{ticket.seatNumber}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCancelTicket(ticket._id)}
                >
                  Cancel Ticket
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ViewBookedTickets;
