import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TextField, Button, Alert, CircularProgress, Box, Typography, Link } from "@mui/material";
import { useUser } from "../../../context/auth";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      setUser(res.data.user);
      navigate(`/`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-container" display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      width="100%">
      <Box className="login-form" p={4} boxShadow={3} borderRadius={2} width="300px" bgcolor="white">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            value={email}
            onChange={changeHandler}
            id="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            value={password}
            onChange={changeHandler}
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </form>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">
            Haven't registered yet?{" "}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
