import { FC, ReactElement } from "react";
import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import { Instagram, Telegram, WhatsApp } from "@mui/icons-material";
import logo from "./../../../public/LOGO circle.png";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
         width: "100%",
        height: "10vh",
        backgroundColor: "#00ab84",
        border: "1px solid black",
        // paddingTop: "1rem",
        position: "static",

      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"space-around"
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // gap: "rem",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton
                aria-label="Instagram"
                component={Link}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                component={Link}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <WhatsApp />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                component={Link}
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Telegram />
              </IconButton>
            </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // gap: "1rem",
            }}
          >
            <Box>
              <img src={logo} alt="Logo" style={{ height: 40 }} />
            </Box>

            <Typography color="black" variant="h5" fontSize="1rem">
              Талад - магазин экзотических растений
            </Typography>
          </Box>
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Typography color="textSecondary" variant="subtitle1">
            {`${new Date().getFullYear()} `}
            </Typography>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
