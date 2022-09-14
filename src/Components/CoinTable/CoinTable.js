import React, { useState, useEffect } from "react";
import { CoinList } from "../../config/api";
import { CrypState } from "../../CrypContext";
import "./CoinTable.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../Banner/Carousel";

function CoinTable() {
  const [page, setPage] = useState(1);
  const { currency, symbol } = CrypState();
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const NavTo = useNavigate();
  const fetchCoinData = async () => {
    setLoading(true);
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoin(data);
    setLoading(false);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleSearch = () => {
    return coin.filter(
      (e) =>
        e.name.toLowerCase().includes(search) ||
        e.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetchCoinData();
    // eslint-disable-next-line
  }, [currency]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{
              fontFamily: "Montserrat",
              margin: 18,
            }}
          >
            Crypto Tokkens prices by Market Cap
          </Typography>
          <TextField
            label="Search Any Tokken......"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress
                style={{ backgroundColor: "gold" }}
              ></LinearProgress>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24 Change", "Market Cap"].map((e) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={e}
                        align={e === "Coin" ? "" : "right"}
                      >
                        {e}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => NavTo(`/coins/${row.id}`)}
                          className="Row"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            ></img>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "toUpperCase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row?.name}&nbsp;
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontWeight: 500,
                              padding: 5,
                            }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "green" : "red",
                              fontWeight: 500,
                              padding: 5,
                            }}
                          >
                            {profit && "+"}
                            {row?.price_change_percentage_24h?.toFixed(2)}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontWeight: 500,
                              padding: 5,
                            }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -9)
                            )}
                            B
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: 10,
            }}
            MuiPaginationItem-root={{ color: "gold" }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 0);
            }}
          ></Pagination>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default CoinTable;
