import { Typography, Box, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const MainPage = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 10vh - 5.3vh)",
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
          opacity: "0.75",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "90%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",  
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            backgroundColor: "rgba(128, 128, 128,)",
            width: "80%",
            padding: "10px 20px", 
            borderRadius: "8px",
            // boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              color: "#2E7D32",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "4.5rem" },
textShadow: "5px 5px 0px rgba(0,0,0,0.12)"

            }}
          >
            Лучшие растения для современной жизни
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Link
            component={RouterLink}
            to="/plants"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: "bold",
                backgroundColor: "#00ab84",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Перейти в магазин
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
