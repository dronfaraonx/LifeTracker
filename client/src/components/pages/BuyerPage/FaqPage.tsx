import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavOrder from './NavOrder';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange = (index: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : false);
  };

  const faqData: FAQItem[] = [
    {
      question: "Можно ли отменить заказ?",
      answer: "Да, вы можете отменить заказ до момента отправки. Свяжитесь с нами как можно скорее для уточнения статуса заказа.",
    },
    {
      question: "Как рассчитывается стоимость доставки?",
      answer: "Стоимость доставки рассчитывается в зависимости от региона и веса посылки. Мы сообщим точную сумму перед отправкой.",
    },
    {
      question: "Как упакованы растения для отправки?",
      answer: "Каждое растение упаковано с учетом его хрупкости и требований. Мы используем упаковочные материалы, обеспечивающие сохранность растений при транспортировке.",
    },
    {
      question: "Что делать, если я получил поврежденное растение?",
      answer: "Если растение прибыло поврежденным, свяжитесь с нами в день получения и отправьте фотографии. Мы рассмотрим претензию и предложим возможные решения.",
    },
    {
      question: "Можно ли заказать редкие растения под заказ?",
      answer: "Да, мы предлагаем возможность заказа редких растений. Свяжитесь с нами для уточнения доступных видов и сроков доставки в группе ВК или чате.",
    },
    {
      question: "Какой способ оплаты вы принимаете?",
      answer: "Мы принимаем оплату через банковские переводы, онлайн-кошельки и наличными при личной встрече. Подробности вы получите в письме с подтверждением заказа.",
    },
    {
      question: "Могу ли я обменять или вернуть растение?",
      answer: "К сожалению, из-за особенностей растений обмен и возврат невозможны, если только растение не прибыло поврежденным. Пожалуйста, уточняйте все вопросы до покупки.",
    },
    {
      question: "Предлагаете ли вы гарантии на растения?",
      answer: "Мы гарантируем, что растения отправляются в здоровом состоянии. Однако, так как мы не контролируем условия содержания после доставки, мы не можем предложить гарантию на долговечность растения.",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 10vh - 5.3vh)",
        backgroundColor: '#f3fff3',
        justifyContent: "center",
        fontSize: "1.2rem",
      }}
    >
      <NavOrder />
      <Box sx={{ padding: '20px', maxWidth: '60%', minHeight: '80vh', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Полезная информация 🌱
        </Typography>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
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
};

export default FAQPage;
