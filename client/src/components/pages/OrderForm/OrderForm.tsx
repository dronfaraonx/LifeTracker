import { useEffect, useState } from "react";
import ThankYouModal from "./ThankyouModal/ThankYouModal";

import {
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../context/auth";
import axios from "axios";
import { useCart } from "../../../context/CountCart";

const API_URL = import.meta.env.VITE_API_URL;
// @ts-expect-error: Ignore this event.
const OrderForm = ({ cart, onClose, discount }) => {
  const { user } = useUser();
  // @ts-expect-error: Ignore this event.
  const { eraseCartCounter } = useCart();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [zip, setZip] = useState("");
  const [thankyou, setThankYou] = useState(false);
  const [contactMethod, setContactMethod] = useState("");
  const [contactValue, setContactValue] = useState("");
  // const [promoCode, ] = useState("");
    // const [discount, ] = useState(0);
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
  }, [user.id]);

  const handleOrderSubmit = async () => {
    const userInfo = {
      id: user.id,
      firstName: name,
      lastName,
      phone,
      city,
      address,
      house,
      apartment,
      zip,
      contactMethod,
      contactValue,
    };
// @ts-expect-error: Ignore this event.
    const cartItems = cart.map((cartItem) => ({
      user_id: user.id,
      plant_id: cartItem.plant_id,
      // name: cartItem.name,
      quantity: cartItem.quantity,
      // photo: cartItem.photo,
      pricePurchanse: (cartItem.price * (1-discount)),
    }));
    console.log("cartItems: ", cartItems);

    try {
      const orderResponse = await axios.post(
        `${API_URL}/api/orders`,
        { cartItems },
        { withCredentials: true }
      );
      console.log("Order created successfully:", orderResponse.data);
      await axios.put(`${API_URL}/api/userInfo`, userInfo, {
        withCredentials: true,
      });
      eraseCartCounter();
      setThankYou(true);
      await axios.post(`${API_URL}/api/send-order`, {
        cart: cartItems,
          // @ts-expect-error: Ignore this event.
        total: calculateTotal(cartItems),
        user: userInfo,
      },  { withCredentials: true });
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    }
  };

const calculateTotal = () => {
  // @ts-expect-error: Ignore this event.
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price ? item.price * item.quantity : 0);
  }, 0);
  return subtotal - subtotal * discount;
};
// @ts-expect-error: Ignore this event.
  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
    setContactValue("");
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "80vh",
        margin: "0 auto",
        border: "1px solid grey",
        borderRadius: "10px",
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
            required
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
            required
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
            required
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
              <MenuItem value="whatsapp">Телеграм</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={`Введите ${
              contactMethod === "phone"
                ? "номер телефона"
                : contactMethod === "email"
                ? "email"
                : "номер Телеграмма"
            }`}
            variant="outlined"
            fullWidth
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#00ab84",
          color: "white",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "10px 20px",
        }}
        fullWidth
        onClick={handleOrderSubmit}
      >
        Подтвердить заказ
      </Button>

      <ThankYouModal open={thankyou} onClose={() => setThankYou(false)} />

      <Button
        variant="outlined"
        sx={{ color: "black", marginTop: "10px" }}
        fullWidth
        onClick={onClose}
      >
        Отмена
      </Button>
    </Box>
  );
};

export default OrderForm;
