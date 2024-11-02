import React, { useState } from "react";
import "./../../index.css";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import logo from "../../../public/LOGO circle.png";
import { useUser } from "../../context/auth";
import AccountModal from "../pages/Authorization/modal/AccountModal";
import SignupModal from "../pages/Authorization/modal/SignUpModal";
import { useCart } from "../../context/CountCart";

export default function Navbar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { cartCounter } = useCart();

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate(`/cart/${user.id}`);
  };

  const handlePlantsClick = () => {
    navigate(`/allplants`);
  };

  const handleClonesClick = () => {
    navigate(`/allclones`);
  };

  const handleSeedsClick = () => {
    navigate(`/allseeds`);
  };

  const handleOpenMenu = (event: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

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
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background: "#00ab84",
            fontSize: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "black",
            }}
          >
            <img
              src="/LOGO circle.png"
              alt="Logo"
              style={{ height: 70, cursor: "pointer" }}
              onClick={handleLogoClick}
            />
            {["Растения", "Клоны", "Семена", "Оплата и доставка"].map(
              (text, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  className="header-link"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    transition: "color 0.3s",
                  }}
                  sx={{
                    "&:hover": { color: "#ffffff" },
                  }}
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
                  {text}
                </Typography>
              )
            )}
          </Box>

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
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("Search:", e.currentTarget.value);
                }
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={user ? handleOpenMenu : handleOpenLogin}>
              <PersonIcon sx={{ color: "black" }} />
            </IconButton>

            {user ? (
              <AccountModal
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
