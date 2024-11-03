import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import AccountModal from "../pages/Authorization/modal/AccountModal";
import SignupModal from "../pages/Authorization/modal/SignUpModal";
import { useCart } from "../../context/CountCart";
import { useUser } from "../../context/auth";
import LogoutButton from "./btns/LogoutBtn";

export default function Navbar() {
  const { user } = useUser();
  const { cartCounter } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => navigate(`/cart/${user.id}`);
  const handlePlantsClick = () => navigate(`/allplants`);
  const handleClonesClick = () => navigate(`/allclones`);
  const handleSeedsClick = () => navigate(`/allseeds`);
  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleAccClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="head">
      <AppBar
        position="static"
        sx={{
          background: "#00ab84",
          boxShadow: "none",
          borderBottom: "2px solid black",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", fontSize: "1rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="/LOGO circle.png"
              alt="Logo"
              style={{
                height: isMobile ? 50 : 70,
                cursor: "pointer",
              }}
              onClick={handleLogoClick}
            />

            {!isMobile ? (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    textDecoration:
                      location.pathname === "/allplants" ? "underline" : "none",
                    textShadow:
                      location.pathname === "/allplants"
                        ? "0 0 4px rgba(255, 255, 255, 0.6)"
                        : "none",
                    fontSize: "1.3rem",
                   transition: "color 0.3s, transform 0.3s",
                    "&:hover": {
                      color: "#ffffff",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={handlePlantsClick}
                >
                  Растения
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    textDecoration:
                      location.pathname === "/allclones" ? "underline" : "none",
                    textShadow:
                      location.pathname === "/allclones"
                        ? "0 0 4px rgba(255, 255, 255, 0.6)"
                        : "none",
                    transition: "color 0.3s, transform 0.3s",
                    "&:hover": {
                      color: "#ffffff",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={handleClonesClick}
                >
                  Клоны
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    textDecoration:
                      location.pathname === "/allseeds" ? "underline" : "none",
                    textShadow:
                      location.pathname === "/allseeds"
                        ? "0 0 4px rgba(255, 255, 255, 0.6)"
                        : "none",
                    transition: "color 0.3s, transform 0.3s",
                    "&:hover": {
                      color: "#ffffff",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={handleSeedsClick}
                >
                  Семена
                </Typography>
              </>
            ) : (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                <SearchIcon sx={{ color: "black" }} />
                <input
                  placeholder="Поиск"
                  style={{
                    marginLeft: 10,
                    color: "black",
                    border: "none",
                    background: "transparent",
                    width: isMobile ? "80px" : "150px",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log("Search:", e.currentTarget.value);
                    }
                  }}
                />
              </Box>
            )}
            <IconButton onClick={user ? handleAccClick : handleOpenLogin}>
              <PersonIcon sx={{ color: "black" }} />
            </IconButton>

            {user ? (
              <AccountModal
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              />
            ) : (
              <SignupModal open={isLoginOpen} onClose={handleCloseLogin} />
            )}

            {user && (
              <>
                <IconButton>
                  <FavoriteIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton onClick={handleCartClick}>
                  <Badge
                    badgeContent={cartCounter}
                    color="primary"
                    showZero
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#e6f6f3",
                        color: "black",
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ color: "black" }} />
                  </Badge>
                </IconButton>
                <LogoutButton></LogoutButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            {["Растения", "Клоны", "Семена", "Оплата и доставка"].map(
              (text, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={
                    index === 0
                      ? handlePlantsClick
                      : index === 1
                      ? handleClonesClick
                      : index === 2
                      ? handleSeedsClick
                      : null
                  }
                >
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
