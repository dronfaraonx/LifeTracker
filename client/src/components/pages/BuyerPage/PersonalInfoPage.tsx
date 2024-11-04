import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";
import NavOrder from "./NavOrder";

const API_URL = import.meta.env.VITE_API_URL;

const PersonalInfoPage = () => {
  const { user } = useUser();
  console.log("user ----> ", user);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [zip, setZip] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    lastName: false,
    phone: false,
    city: false,
    address: false,
    house: false,
    zip: false,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/userInfo/${user.id}`, {
          withCredentials: true,
        });
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
          setContactMethod(response.data.contactMethod);
          setContactValue(response.data.contactValue);
        }
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleUpdateUserInfo = async () => {
    try {
      await axios.put(
        `${API_URL}/api/userInfo`,
        {
          firstName: name,
          lastName,
          email,
          phone,
          city,
          address,
          house,
          apartment,
          zip,
          contactMethod,
          contactValue
        },
        { withCredentials: true }
      );
      alert("Информация изменена");
    } catch (error) {
      console.log("Ошибка страницы данных пользователя: ", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/passwordUpdate`,
        {
          userId: user.id,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      alert("Пароль успешно обновлен");
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setShowPasswordFields(false);
    } catch (error) {
      console.log("Ошибка изменения пароля пользователя", error);
    }
  };

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
    setContactValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "84.4vh",
        justifyContent: "center",
        fontSize: "1.2rem",
        "& .MuiTableCell-root": {
          fontSize: "1.2rem",
        },
      }}
    >
      <NavOrder />
      <Box
        sx={{
          maxWidth: "600px",
          margin: "auto",
          border: "1px solid grey",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Информация для доставки:
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!name && touched.name}
              helperText={
                !name && touched.name ? "Поле обязательно для заполнения" : ""
              }
              onBlur={() => setTouched({ ...touched, name: true })}
            />{" "}
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!lastName && touched.lastName}
              helperText={
                !lastName && touched.lastName
                  ? "Поле обязательно для заполнения"
                  : ""
              }
              onBlur={() => setTouched({ ...touched, lastName: true })}
            />{" "}
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!/^\d{11}$/.test(phone) && phone !== ""}
              helperText={
                !/^\d{11}$/.test(phone) && phone !== ""
                  ? "Введите номер в формате 8XXXXXXXXXX"
                  : ""
              }
            />
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Населенный пункт"
              variant="outlined"
              fullWidth
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!city && touched.city}
              helperText={
                !city && touched.city ? "Поле обязательно для заполнения" : ""
              }
              onBlur={() => setTouched({ ...touched, city: true })}
            />{" "}
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Улица"
              variant="outlined"
              fullWidth
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!address && touched.address}
              helperText={
                !address && touched.address
                  ? "Поле обязательно для заполнения"
                  : ""
              }
              onBlur={() => setTouched({ ...touched, address: true })}
            />{" "}
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Дом"
              variant="outlined"
              fullWidth
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              onBlur={() => setTouched({ ...touched, house: true })}
              error={!house && touched.house}
              helperText={
                !house && touched.house ? "Поле обязательно для заполнения" : ""
              }
            />
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Квартира"
              variant="outlined"
              fullWidth
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
          </Box>
          <Box sx={{ flex: "1 1 48%" }}>
            <TextField
              label="Индекс"
              variant="outlined"
              fullWidth
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onBlur={() => setTouched({ ...touched, zip: true })}
              error={!zip && touched.house}
              helperText={
                !zip && touched.zip ? "Поле обязательно для заполнения" : ""
              }
            />
          </Box>
        </Box>
        <Box
          sx={{ flex: "1 1 48%", justifyContent: "center", marginTop: "20px" }}
        >
          <Box sx={{ marginTop: "20px" }}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            >
              <InputLabel>Способ связи</InputLabel>
              <Select
                label="Способ связи"
                value={contactMethod}
                onChange={handleContactMethodChange}
              >
                <MenuItem value="phone">Телефон</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={`Введите ${
                contactMethod === "phone"
                  ? "номер телефона"
                  : contactMethod === "email"
                  ? "email"
                  : "номер WhatsApp"
              }`}
              variant="outlined"
              fullWidth
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 20px",
                marginTop: "20px",

                "&:hover": { backgroundColor: "#45a049" },
                transition: "background-color 0.3s ease",
              }}
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              {showPasswordFields ? "Отмена" : "Изменить Пароль"}
            </Button>
          </Box>
        </Box>

        {showPasswordFields && (
          <Box sx={{ marginTop: "20px" }}>
            <TextField
              label="Старый пароль"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              label="Новый пароль"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              // error={newPassword.length < 6 && newPassword.length > 0}
              helperText={
                newPassword.length < 6 && newPassword.length > 0
                  ? "Пароль должен содержать минимум 6 символов"
                  : ""
              }
            />

            <TextField
              label="Подтвердите новый пароль"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // error={
              //   confirmPassword !== newPassword ||
              //   (confirmPassword.length < 6 && confirmPassword.length > 0)
              // }
              // helperText={
              //   confirmPassword.length < 6 && confirmPassword !== newPassword
              //     ? "Пароли не совпадают"
              //     : confirmPassword.length < 6 && confirmPassword.length > 0
              //     ? "Пароль должен содержать минимум 6 символов"
              //     : ""
              // }
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#f44336",
                color: "white",
                marginTop: "10px",
                "&:hover": { backgroundColor: "#45a049" },
                transition: "background-color 0.3s ease",
              }}
              onClick={handlePasswordChange}
            >
              Сохранить новый пароль
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#00ab84",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleUpdateUserInfo}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoPage;
