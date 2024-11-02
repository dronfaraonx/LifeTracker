import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField, Button, Alert, Box, CircularProgress, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { FormDataType } from "../authTypes";
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
  const [activeTab, setActiveTab] = useState(0);
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

    if (activeTab === 1 && formData.password !== formData.repeat) {
      setErrorMessage("Пароли не сходятся");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = activeTab === 0 ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/signup`;
      const requestData = activeTab === 0 
        ? { email: formData.email, password: formData.password } 
        : { ...formData, repeatPassword: formData.repeat };

      const res = await axios.post(endpoint, requestData, { withCredentials: true });
      setUser(res.data.user);
      navigate('/');
      onClose();
    } catch (error) {
      console.log(error);
      setErrorMessage("Произошла ошибка. Пожалуйста, проверьте введённые данные.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<object>, newValue: number) => {
    setActiveTab(newValue);
    setErrorMessage(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ margin: '16px' }}>
        {activeTab === 0 ? "Вход" : "Регистрация"}
      </DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Логин" />
          <Tab label="Регистрация" />
        </Tabs>
        <Box
          component="form"
          // onSubmit={submitHandler}
          sx={{ display: "flex", flexDirection: "column", gap: 1, mb: '10px' }}
        >
          {activeTab === 1 && (
            <TextField
              label="Имя"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              variant="outlined"
              required
            />
          )}
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
          {activeTab === 1 && (
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
          )}

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Закрыть</Button>
        <Button type="submit" variant="contained" color="primary" onClick={submitHandler} disabled={isLoading} sx={{ backgroundColor: 'green', color: 'white' }}>
          {isLoading ? <CircularProgress size={24} /> : activeTab === 0 ? "Войти" : "Зарегистрироваться"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupModal;
