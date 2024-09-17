import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const Success = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get the state passed from the previous component
  const { seatNumbers } = location.state || {}; // Extract seatNumbers from the state, if available

  const handleDashboardRedirect = () => {
    // Navigate to the user dashboard
    navigate("/userdashboard");
  };

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#1e1e1e"
      color="white"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Booking Confirmed! Thank you!
      </Typography>

      <Typography variant="h6" gutterBottom>
        Your seats have been successfully booked.
      </Typography>

      {seatNumbers && seatNumbers.length > 0 ? (
        <Typography variant="body1" gutterBottom>
          <strong>Seat Numbers:</strong> {seatNumbers.join(", ")}
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
         Mail confirmation and booking details sent to your mail!
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleDashboardRedirect}
      >
        Go to User Dashboard
      </Button>
    </Box>
  );
};

export default Success;
