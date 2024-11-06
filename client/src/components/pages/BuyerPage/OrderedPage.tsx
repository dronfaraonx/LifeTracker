import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const OrderedPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const { uuid_order } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id && uuid_order) {
        try {
          const response = await axios.get(
            `${API_URL}/api/orders/order-details/${uuid_order}`,
            {
              withCredentials: true,
            }
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
        }
      }
    };

    fetchOrders();
  }, [user, uuid_order]);

  const totalPrice = orders.reduce((accumulator, order) => {
    // @ts-expect-error: Ignore this event.
    return accumulator + order.pricePurchase * order.quantity;
  }, 0);

  return (
    <div className="buyerContainer">
      <Box sx={{ padding: "20px", minHeight: "calc(100vh - 10vh - 5.3vh)" }}>
        <Typography variant="h4" gutterBottom>
          Мой заказ:
        </Typography>
        <div>
          <ul>
            {
              // @ts-expect-error: Ignore this event.
              [...new Set(orders.map((order) => order.uuid_order))].map(
                (uniqueOrder) => (
                  <li key={uniqueOrder}>{uniqueOrder}</li>
                )
              )
            }
          </ul>
        </div>

        {orders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Номер заказа</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell>Цена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  // @ts-expect-error: Ignore this event.
                  <TableRow key={order.id}>
                    <TableCell>
                      {
                        // @ts-expect-error: Ignore this event.
                        order.id
                      }
                    </TableCell>
                    <TableCell>
                      {new Date(
                        // @ts-expect-error: Ignore this event.
                        order.createdAt
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {
                        // @ts-expect-error: Ignore this event.
                        order.Plant.name
                      }
                    </TableCell>
                    <TableCell>
                      {
                        // @ts-expect-error: Ignore this event.
                        order.pricePurchase
                      }{" "}
                      ₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginRight: "10px" }}
              >
                Общая сумма (без учета скидки):
              </Typography>
              <Typography variant="h6" sx={{ color: "#00ab84" }}>
                {totalPrice.toFixed(2)} ₽
              </Typography>
            </Box>
          </TableContainer>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            У вас нет заказов.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default OrderedPage;
