import { FC, ReactElement } from "react";
import { Box, Container, Typography, IconButton, Link, useTheme, useMediaQuery } from "@mui/material";
import { Email, Telegram,  } from "@mui/icons-material";
import { FaVk } from 'react-icons/fa';

export const Footer: FC = (): ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "8vh",
        backgroundColor: "#00ab84",
        borderTop: "1px solid black",
        // padding: "1rem 0",
        position: "static",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
                <IconButton
      aria-label="VKontakte"
      component={Link}
      href="https://vk.com/talad_plants"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
    >
      <FaVk size={24} />
    </IconButton>
            <IconButton
              aria-label="WhatsApp"
              component={Link}
              href="mailto:talad_plants@mail.ru"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <Email />
            </IconButton>
            <IconButton
              aria-label="Telegram"
              component={Link}
              href="https://t.me/talad_plants"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <Telegram />
            </IconButton>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box>
                <img src="/LOGO circle.png" alt="Logo" style={{ height: 30 }} />
              </Box>
              <Typography color="black" variant="h5" fontSize="1rem" ml={2}>
                Талад - магазин экзотических растений
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
