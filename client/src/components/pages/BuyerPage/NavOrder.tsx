import { Box, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavOrder() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Мои данные", path: "/myaccount" },
    { label: "Мои заказы", path: "/dashboard" },
    { label: "Полезная информация", path: "/info" },
    { label: "Скидки", path: "/discount" },
  ];

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
        {navItems.map((item, index) => (
        // @ts-expect-error: Ignore this event.
          <ListItem 
            button 
            key={index} 
            onClick={() => navigate(item.path)}
          >
            {     
            item.label}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
