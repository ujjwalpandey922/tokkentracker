import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import CssBaseline from "@mui/material/CssBaseline";
import { CrypState } from "../../CrypContext";
function Header() {
  const Navto = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { currency, setCurrency } = CrypState();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className="headerName"
              variant="h5"
              onClick={() => {
                Navto("/");
              }}
            >
              Tokken Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{
                height: 40,
                width: 100,
                marginRight: 20,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
