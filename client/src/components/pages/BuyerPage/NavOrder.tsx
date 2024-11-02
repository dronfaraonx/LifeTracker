import { Box, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavOrder() {
  const navigate = useNavigate();

  const handleAccClick = () => {
    navigate(`/account`);
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
        <ListItem button>Мои данные</ListItem>
        <ListItem button selected onClick={handleAccClick}>
          Мои заказы
        </ListItem>
        <ListItem button>Полезная информация</ListItem>
        <ListItem button>Скидки</ListItem>
      </List>
    </Box>
  );
}
