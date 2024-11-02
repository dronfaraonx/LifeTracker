import { Box, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavOrder() {
  const navigate = useNavigate();

  const handleDashClick = () => {
    navigate(`/dashboard`);
  };
  
  const handleAccClick = () => {
    navigate(`/myaccount`);
  };

  const handleInfoClick = () => {
    navigate(`/info`);
  };

  const handleDiscountClick = () => {
    navigate(`/discounts`);
  };

  return (
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
        <ListItem 
          button 
          onClick={handleAccClick}
        >
          Мои данные
        </ListItem>
        <ListItem 
          button 
          onClick={handleDashClick}
        >
          Мои заказы
        </ListItem>
        <ListItem 
          button 
          onClick={handleInfoClick}
        >
          Полезная информация
        </ListItem>
        <ListItem 
          button 
          onClick={handleDiscountClick}
        >
          Скидки
        </ListItem>
      </List>
    </Box>
  );
}
