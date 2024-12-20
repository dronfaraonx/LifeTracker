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
import Loading from "../../ui/Loading";
import NavOrder from "./NavOrder";

const API_URL = import.meta.env.VITE_API_URL;

const OrderDashboard = () => {
  const { user } = useUser();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        // @ts-expect-error: Ignore this event.
        setError("Не удалось загрузить заказы. Попробуйте еще раз.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const uniqueOrders = [
    // @ts-expect-error: Ignore this event.
    ...new Set(allOrders.map((order) => order.uuid_order)),
  ].map((uniqueOrder) => {
    // @ts-expect-error: Ignore this event.
    const order = allOrders.find((o) => o.uuid_order === uniqueOrder);
    return {
      uuid_order: uniqueOrder,
      // @ts-expect-error: Ignore this event.
      createdAt: order ? order.createdAt : null,
      // @ts-expect-error: Ignore this event.
      items: order ? order.items : [],
      // @ts-expect-error: Ignore this event.
      status: order ? order.status : "",
    };
  });

  // @ts-expect-error: Ignore this event.
  const handleOrderClick = (uuid) => {
    navigate(`/order-details/${uuid}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 10vh - 5.3vh)",
        backgroundColor: "#f3fff3",
        justifyContent: "center",
        fontSize: "1.2rem",
        "& .MuiTableCell-root": {
          fontSize: "1.2rem",
        },
      }}
    >
      <NavOrder />

      {error ? (
        <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
          {error}
        </Typography>
      ) : uniqueOrders ? (
        <Box sx={{ flex: 1, p: 2 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="outlined">Все</Button>
            <Button variant="outlined">Обработка</Button>
            <Button variant="outlined">Отправлено</Button>
            <Button variant="outlined">Доставлено</Button>
          </Stack>
          <List>
            {uniqueOrders.map(({ uuid_order, createdAt }) => (
              <React.Fragment key={uuid_order}>
                <ListItem
                  onClick={() => handleOrderClick(uuid_order)}
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
                      <Typography variant="h5" color="textPrimary">
                        Номер заказа: {uuid_order}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: "#fff3cd",
                          color: "#856404",
                          borderRadius: 1,
                          px: 1,
                          py: 0.5,
                          fontSize: "1.2rem",
                        }}
                      >
                        Обработка заказа
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="caption"
                        sx={{ color: "black", fontSize: "1.2rem" }}
                      >
                        {createdAt
                          ? `Заказ создан: ${new Date(createdAt).toLocaleString(
                              "ru-RU",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}`
                          : "Unknown date"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          У вас нет заказов.
        </Typography>
      )}
    </Box>
  );
};

export default OrderDashboard;
