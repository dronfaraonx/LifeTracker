import React from "react";
import { Typography, Box, Link, Button } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useUser } from "../../../context/auth";

const MainPage = () => {
  const { user } = useUser();
  return (
    <Box
      sx={{
        height: "calc(100vh - 10vh - 10vh)",
        position: "relative",
        width: "100vw",
        overflow: "hidden",
        background: "#f5fff5",
      }}
    >
      <img
        src="https://hips.hearstapps.com/hmg-prod/images/collection-of-beautiful-houseplants-on-wooden-table-royalty-free-image-1712685460.jpg?crop=1xw:0.84415xh;center,top"
        alt="Цветок"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: "0.7",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          // color: "white",
          // padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#2E7D32",
            textAlign: "center",
            mt: 3,
            mb: 2,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Лучшие растения для современной жизни
        </Typography>

        <Link component={RouterLink} to="/" style={{ textDecoration: "none" }}>
          <Button
  component={RouterLink}
  to="/plants"
  variant="contained"
  sx={{
    mt: 2, 
    px: 4, 
    py: 1.5,
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#00ab84",
    color: "black",
    borderRadius: "8px", 
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
    transition: "background-color 0.3s, transform 0.3s", 
    "&:hover": {
      backgroundColor: "#007b5e",
      transform: "scale(1.05)",
    },
  }}
>
  Перейти в магазин
</Button>

        </Link>
      </Box>
    </Box>
  );
};

export default MainPage;
