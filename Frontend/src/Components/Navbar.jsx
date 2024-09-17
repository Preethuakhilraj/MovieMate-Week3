import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFD700",
    },
    text: {
      primary: "#FFD700",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
      fontFamily: "Roboto, sans-serif",
    },
    button: {
      textTransform: "none",
    },
  },
});

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    // Check if the user data exists and is not "undefined"
    if (storedIsAuthenticated === "true") {
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null); // Reset the user if parsing fails
        }
      } else {
        setUser(null); // Set user to null if no user is found
      }
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = user?.email === "admin@example.com";

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" sx={{ height: "100px", justifyContent: "center" }}>
        <Toolbar>
          <Typography variant="h6" color="textPrimary" sx={{ flexGrow: 1 }}>
            MovieMate
          </Typography>

          {!isAuthenticated ? (
            <>
              <Button
                color="secondary"
                component={Link}
                to="/"
                sx={{
                  fontWeight: isActive("/") ? "bold" : "normal",
                  borderBottom: isActive("/") ? "2px solid gold" : "none",
                }}
              >
                Home
              </Button>
              <Button
                color="secondary"
                component={Link}
                to="/login"
                sx={{
                  fontWeight: isActive("/login") ? "bold" : "normal",
                  borderBottom: isActive("/login") ? "2px solid gold" : "none",
                }}
              >
                Login
              </Button>
              <Button
                color="secondary"
                component={Link}
                to="/signup"
                sx={{
                  fontWeight: isActive("/signup") ? "bold" : "normal",
                  borderBottom: isActive("/signup") ? "2px solid gold" : "none",
                }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center" sx={{ marginRight: 2 }}>
                <Button
                  color="secondary"
                  component={Link}
                  to="/userdashboard"
                  sx={{
                    fontWeight: isActive("/userdashboard") ? "bold" : "normal",
                    borderBottom: isActive("/userdashboard") ? "2px solid gold" : "none",
                    marginRight: 2,
                  }}
                >
                  User Dashboard
                </Button>
                <Button
                  color="secondary"
                  component={Link}
                  to="/booked-tickets"
                  sx={{
                    fontWeight: isActive("/booked-tickets") ? "bold" : "normal",
                    borderBottom: isActive("/booked-tickets") ? "2px solid gold" : "none",
                  }}
                >
                  Booked Tickets
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto' }}>
                <Avatar sx={{ bgcolor: "primary.main", marginRight: 1 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="h6" color="textPrimary">
                  {isAdmin ? "Welcome Admin" : `Welcome, ${user?.name || "Guest"}`}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "6px 16px",
                    marginLeft: 2,
                    backgroundColor: "gold",
                    "&:hover": {
                      backgroundColor: "yellow",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
