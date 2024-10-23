import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Alert, Box, CircularProgress, Typography } from "@mui/material";
import { FormDataType } from "./authTypes";
import { useUser } from "../../../context/auth";

const SignupPage = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState<FormDataType>({ name: "", email: "", password: "", repeat: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.repeat) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/signup`,
        {
          ...formData,
          repeatPassword: formData.repeat,
        },
        { withCredentials: true }
      );
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Signup failed. Please try again.");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-container" display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}
        p={4} boxShadow={3} borderRadius={2} width="300px" bgcolor="white"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign up
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          variant="outlined"
          type="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          variant="outlined"
          type="password"
          required
        />
        <TextField
          label="Repeat Password"
          name="repeat"
          value={formData.repeat}
          onChange={changeHandler}
          variant="outlined"
          type="password"
          required
          error={formData.repeat.length > 0 && formData.repeat !== formData.password}
          helperText={formData.repeat.length > 0 && formData.repeat !== formData.password ? "Passwords should match" : ""}
        />

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="body2">
          Have already an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </Typography>
      </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
