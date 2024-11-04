import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavOrder from './NavOrder';

export default function FAQPage() {
  const faqData = [
        {
      question: "Как происходит оплата?",
      answer: "После заказа, вам придет подтверждение на электронную почту с дальнейшей инструкцией об оплате.",
    },
      {
      question: "Как нам написать?",
      answer: "Вы можете написать в чат сайта, или через телеграм или группу в Вконтактею",
    },
    {
      question: "Что есть в наличии?",
      answer: "Здесь вы можете купить семена, клоны и взрослые растения, импортированных из Юго-Восточной Азии",
    },
    {
      question: "Можно ли отказаться от растения?",
      answer: "Отказы от растений принимаются только в случае, если растение еще не выкуплено. После выкупа растения, задаток не возвращается...",
    },
    {
      question: "Когда можно забрать растения?",
      answer: "Растения нужно забрать в течение недели, если не оговорено иное (например, передержка или доставка)...",
    },
    {
      question: "Отправляете ли Вы почтой?",
      answer: "Я отправляю растения почтой. Все посылки утепляю, чтобы растения не замерли и не были повреждены...",
    },
    {
      question: "Что нужно знать перед отправкой растения?",
      answer: "Предоставьте необходимую информацию для отправления.",
    },
    {
      question: "Помогаете ли Вы с адаптацией?",
      answer: "Растения из Таиланда требуют адаптации и дополнительного ухода. Прежде чем оформить заказ на то или иное растение, почитайте про его особенности...",
    },
    {
      question: "Претензии по качеству",
      answer: "Претензии по качеству полученных растений принимаются СТРОГО в день получения или на следующий день после получения Вами заказа с фотографиями проблемных мест...",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 10vh - 5.3vh)", backgroundColor:'#f3fff3', justifyContent: "center",
    fontSize: "1.2rem",
    "& .MuiTableCell-root": {
      fontSize: "1.2rem", 
    }}}>    <NavOrder/>
    <Box sx={{ padding: '20px', maxWidth: '60%', minHeight: '80vh', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Полезная информация 🌱
      </Typography>
      {faqData.map((item, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
        </Box>

  );
}
