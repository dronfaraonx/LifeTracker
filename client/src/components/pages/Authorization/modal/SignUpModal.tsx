import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField, Button, Alert, Box, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { FormDataType } from "../authTypes"
import { useUser } from "../../../../context/auth";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose }) => {
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
      setErrorMessage("Пароли не сходятся");
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
      onClose(); // Close the modal after successful signup
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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{ display: "flex", flexDirection: "column", gap: 1, padding: '10px'}}
        >
          <TextField
            label="Имя"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            variant="outlined"
            required
          />
          <TextField
            label="Эл. Почта"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            variant="outlined"
            type="email"
            required
          />
          <TextField
            label="Пароль"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            variant="outlined"
            type="password"
            required
          />
          <TextField
            label="Повторить пароль"
            name="repeat"
            value={formData.repeat}
            onChange={changeHandler}
            variant="outlined"
            type="password"
            required
            error={formData.repeat.length > 0 && formData.repeat !== formData.password}
            helperText={formData.repeat.length > 0 && formData.repeat !== formData.password ? "Пароли должны совпадать" : ""}
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Закрыть</Button>
        <Button type="submit" variant="contained" color="primary" onClick={submitHandler} disabled={isLoading} sx={{ backgroundColor: 'green', color: 'white' }}>
          {isLoading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupModal;
