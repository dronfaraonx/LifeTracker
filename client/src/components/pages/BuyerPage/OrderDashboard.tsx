import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Divider,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const OrderDashboard = () => {
  const { user } = useUser();
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders/user`, {
          withCredentials: true,
        });
        setAllOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const uniqueOrders = [
    ...new Set(allOrders.map((order) => order.uuid_order)),
  ].map((uniqueOrder) => {
    const order = allOrders.find((o) => o.uuid_order === uniqueOrder);
    return {
      uuid_order: uniqueOrder,
      createdAt: order ? order.createdAt : null,
      items: order ? order.items : "No items",
    };
  });


  const OrderListItem = ({ order }) => {
    const handleOrderClick = () => {
      navigate(`/order-details/${order.uuid_order}`);
    };

    return (
      <ListItem
        onClick={handleOrderClick}
        sx={{
          bgcolor: "#fff",
          borderRadius: 1,
          boxShadow: 1,
          p: 2,
          mb: 2,
          display: "flex",
          cursor: "pointer",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2" color="textPrimary">
              Номер заказа: {order.uuid_order}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="caption"
              sx={{
                bgcolor: "#c6f6d5",
                color: "black",
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              Отправлено
              {/* {order.status} */}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" sx={{ color: "black" }}>
              {order.createdAt
                ? `Заказ создан: ${new Date(
                    order.createdAt
                  ).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}`
                : "Unknown date"}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "80vh" }}>
      <Box
        sx={{
          width: 240,
          bgcolor: "#fff",
          p: 2,
          borderRight: "1px solid #ddd",
          cursor: "pointer",
        }}
      >
        <List>
          <ListItem button>Мои данные</ListItem>
          <ListItem button selected>
            Мои заказы
          </ListItem>
          <ListItem button>Полезная информация</ListItem>
          <ListItem button>Скидки</ListItem>
        </List>
      </Box>

      <Box sx={{ flex: 1, p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "#00ab84",
                color: "#e0f7fa",
              },
            }}
          >
            Все
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "#00ab84",
                color: "#e0f7fa",
              },
            }}
          >
            Обработка
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "#00ab84",
                color: "#e0f7fa",
              },
            }}
          >
            Отправлено
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "#00ab84",
                color: "#e0f7fa",
              },
            }}
          >
            Доставлено
          </Button>
        </Stack>

        <List>
          {uniqueOrders.map((order) => (
            <React.Fragment key={order.uuid_order}>
              <OrderListItem order={order} />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default OrderDashboard;
