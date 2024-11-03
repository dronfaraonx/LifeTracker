import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ThankYouModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); 
    onClose();
  };
  const handleGoAcc = () => {
    navigate("/dashboard"); 
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="thank-you-title">
      <Box
         sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography id="thank-you-title" variant="h5" sx={{ mb: 2 }}>
          Спасибо за покупку!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Ваш заказ успешно оформлен. Мы с Вами свяжемся в ближайшее время.
        </Typography>
          <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleGoAcc}
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#00ab84"}}
          >
            Мой аккаунт
          </Button>
          <Button
            variant="contained"
            onClick={handleGoHome}
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#00ab84" }}
          >
            На главную страницу
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ThankYouModal;
