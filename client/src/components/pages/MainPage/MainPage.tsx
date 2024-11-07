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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "90%",
          maxWidth: "500px",
          padding: "10px",
        }}
      >
  <Box
  sx={{
    display: "inline-block",
    backgroundColor: "rgba(128, 128, 128,)",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"
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
      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
    }}
  >
    Лучшие растения для современной жизни
  </Typography>
</Box>



        <Link component={RouterLink} to="/plants" style={{ textDecoration: "none" }}>
          <Button
            component={RouterLink}
            to="/plants"
            variant="contained"
            sx={{
              mt: 2,
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
  );
};

export default MainPage;
