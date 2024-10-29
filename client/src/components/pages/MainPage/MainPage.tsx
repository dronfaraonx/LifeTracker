import React from "react";
import {
  Typography,
  Box,
  Link,
  Button,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useUser } from '../../../context/auth';

const MainPage = () => {
  const { user } = useUser();
  return (
     <Box
        sx={{
          position: "relative",
          width: "100vw",
          overflow: "hidden",
          background: "#f5fff5"
        }}
      >
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/collection-of-beautiful-houseplants-on-wooden-table-royalty-free-image-1712685460.jpg?crop=1xw:0.84415xh;center,top"
          alt="Цветок"
          style={{
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            opacity: "0.7"
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "Roboto, sans-serif" }}>
            Лучшие цветы для современной жизни
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            style={{ textDecoration: "none" }}
          >
            <Button
              component={RouterLink}
              to="/plants"
              variant="contained"
              sx={{
                marginTop: "10px",
                backgroundColor: "green",
                color: "white",
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
