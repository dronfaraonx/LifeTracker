import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUser } from "../../../../context/auth";

interface LoginModalProps {
  open: boolean; 
  handleClose: () => void; 
}

const API_URL = import.meta.env.VITE_API_URL;

  const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ email: '', password: '' });
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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData, { withCredentials: true });
      setUser(res.data.user);
      handleClose();
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
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h4" align="center">Войти</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={submitHandler} id="login-form">
          <TextField
            value={formData.email}
            onChange={changeHandler}
            name="email"
            label="Эл. почта"
            placeholder="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            value={formData.password}
            onChange={changeHandler}
            name="password"
            label="Пароль"
            placeholder="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary" form="login-form" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Войти'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
