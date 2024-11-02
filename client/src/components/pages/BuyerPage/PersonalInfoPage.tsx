import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useUser } from '../../../context/auth';
import NavOrder from './NavOrder';

const API_URL = import.meta.env.VITE_API_URL;

const PersonalInfoPage = () => {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [zip, setZip] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/userInfo/${user.id}`, { withCredentials: true });
        if (response.data) {
          setName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setCity(response.data.city);
          setAddress(response.data.address);
          setHouse(response.data.house);
          setApartment(response.data.apartment);
          setZip(response.data.zip);
        }
      } catch (error) {
        console.error("User info error:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleUpdateUserInfo = async () => {
    try {
      await axios.put(`${API_URL}/api/userInfo`, {
        firstName: name,
        lastName,
        email,
        phone,
        city,
        address,
        house,
        apartment,
        zip,
      }, { withCredentials: true });
      alert("User info updated successfully");
    } catch (error) {
      console.log('Personal Page Error: ', error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/updatePassword`, {
        userId: user.id,
        oldPassword,
        newPassword,
      }, { withCredentials: true });
      alert("Password updated successfully");
      setShowPasswordFields(false); // Hide password fields after successful update
    } catch (error) {
      console.log("Error updating password", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "80vh", justifyContent: "center" }}>
      <NavOrder />
      <Box sx={{ maxWidth: '600px', margin: 'auto', minHeight: '84.3vh', backgroundColor: 'white', padding: '20px' }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          Адрес доставки:
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between' }}>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Имя" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Фамилия" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Телефон" variant="outlined" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Населенный пункт" variant="outlined" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Улица" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Дом" variant="outlined" fullWidth value={house} onChange={(e) => setHouse(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Квартира" variant="outlined" fullWidth value={apartment} onChange={(e) => setApartment(e.target.value)} />
          </Box>
          <Box sx={{ flex: '1 1 48%' }}>
            <TextField label="Индекс" variant="outlined" fullWidth value={zip} onChange={(e) => setZip(e.target.value)} />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#4caf50', color: 'white', marginTop: '20px', '&:hover': { backgroundColor: '#45a049' } }}
          onClick={() => setShowPasswordFields(!showPasswordFields)}
        >
          Изменить Пароль
        </Button>

        {showPasswordFields && (
          <Box sx={{ marginTop: '20px' }}>
            <TextField label="Старый пароль" variant="outlined" type="password" fullWidth margin="normal" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <TextField label="Новый пароль" variant="outlined" type="password" fullWidth margin="normal" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <TextField label="Подтвердите новый пароль" variant="outlined" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button variant="contained" fullWidth sx={{ backgroundColor: '#f44336', color: 'white', marginTop: '10px', '&:hover': { backgroundColor: '#d32f2f' } }} onClick={handlePasswordChange}>
              Сохранить новый пароль
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#00ab84", color: 'white', marginTop: '20px', transition: "background-color 0.3s, transform 0.3s", "&:hover": { transform: "scale(1.05)", color: 'white' } }}
          onClick={handleUpdateUserInfo}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoPage;
