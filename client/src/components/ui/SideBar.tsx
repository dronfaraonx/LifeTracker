import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "./btns/LogoutBtn";
import { useUser } from "../../context/auth";

const Sidebar = () => {
  const { user } = useUser();

  return (
    user && (
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            height: "calc(100vh - 20px)",
            boxSizing: "border-box",
            borderRadius: "15px",
            backgroundColor: "purple",
            marginLeft: "120px",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          <ListItem
            button
            component={Link}
            to="/profile"
            sx={{
                  '&:hover': {
          background: 'linear-gradient(90deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)', // Use background instead of backgroundColor
        },
        color: 'white', 
        transition: 'background 0.3s ease', 
        borderRadius: '10px'
            }}
          >
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/settings"
            sx={{
              "&:hover": {
                background:
                  "linear-gradient(90deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)", // Use background instead of backgroundColor
              },
              color: "white",
              transition: "background 0.3s ease",
              borderRadius: "10px",
            }}
          >
            <ListItemText primary="Settings" />
          </ListItem>
        </List>

        <Box sx={{ marginTop: "auto", padding: "10px" }}>
          <LogoutButton />
        </Box>
      </Drawer>
    )
  );
};

export default Sidebar;
