import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useUser } from "../../../context/auth";
import SignupModal from "../Authorization/modal/SignUpModal";
import { useCart } from "../../../context/CountCart";
import Plant from "../ShopList/Plant";
import "./ShopItem.style.css";
import QuantityInput from "../../ui/btns/NumberInput";

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopItem() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { handleAddtoCartCounter } = useCart();

  useEffect(() => {
    const fetchOnePlant = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.log("Ошибка при загрузке растения", error);
        alert("Не удалось загрузить растение. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };
    fetchOnePlant();
  }, [id]);

  const handleModelRegOpen = () => setOpen(true);
  const handleModelRegClose = () => setOpen(false);

  const handleBack = () => {
    navigate("/plants");
  };

  const handleAddToCart = async () => {
    if (!plant?.id || !user?.id) {
      return;
    }

    const cartItem = {
      plant_id: plant.id,
      user_id: user.id,
      quantity: quantity,
    };

    try {
      const response = await axios.post(`${API_URL}/api/cart`, cartItem, {
        withCredentials: true,
      });
      console.log("Растение добавалено в корзину: ", response.data);
      handleAddtoCartCounter(quantity);
    } catch (error) {
      console.log("Ошибка при добавлении в корзину", error);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div
      className="itemContainer"
      style={{ minHeight: "calc(100vh - 10vh - 5.3vh)" }}
    >
      <div className="plant-item">
        <div className="imageBlock">
          <img
            src={plant.photo}
            alt={plant.name}
            className="plant-card-media"
          />
        </div>

        <div className="plant-card-content">
          <h5>
            {plant.type} {plant.name}
          </h5>
          <p>Описание: {plant.description || "Описание не указано."}</p>
          <p style={{ color: "black", fontSize: "2rem" }}>
            Цена: {plant.price ? `${plant.price}р.` : "Цена не указана"}
          </p>
          <div className="plant-card-actions">
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <Button
              className="add-to-cart-button"
              onClick={user ? handleAddToCart : handleModelRegOpen}
              disabled={loading}
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#00ab84",
                color: "white",
                borderRadius: "8px",
                transition: "background-color 0.3s, transform 0.2s",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

                  transform: "scale(1.01)",
                },
              }}
            >
              В корзину
            </Button>

            <SignupModal open={open} onClose={handleModelRegClose} />
          </div>
          <div className="backBtn">
            <Button className="back-button" onClick={handleBack}>
              Назад
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
