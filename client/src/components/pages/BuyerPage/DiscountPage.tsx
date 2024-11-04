import { Box, Typography, Paper } from '@mui/material';
import NavOrder from './NavOrder';

export default function DiscountPage () {
  return (
     <Box sx={{ display: "flex", minHeight: "calc(100vh - 10vh - 5.3vh)", backgroundColor:'#f3fff3', justifyContent: "center",
    fontSize: "1.2rem",
    "& .MuiTableCell-root": {
      fontSize: "1.4rem", 
    }}}>    <NavOrder/>
    <Box sx={{ padding: '20px', maxWidth: '60%', minHeight: '80vh', margin: '0 auto' }}>
      <Paper elevation={3} sx={{ maxWidth: 600, padding: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🎉 Скидка на Первую Покупку 🎉
        </Typography>
        <Typography variant="h6" paragraph>
          Сделайте первую покупку через наш сайт и получите скидку 5% на ваш заказ! 🛒💸
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          ⚠️ Пожалуйста, обратите внимание, что итоговая сумма со скидкой будет рассчитана вручную, 
          когда наш продавец свяжется с вами для подтверждения заказа. 
        </Typography>
      </Paper>
    </Box>
    </Box>
  );
};
