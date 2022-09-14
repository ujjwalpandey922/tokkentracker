import { LinearProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChartInfo from "../Components/ChartInfo/ChartInfo";
import { SingleCoin } from "../config/api";
import { CrypState } from "../CrypContext";
// import parse from "html-react-parser";
import "./CoinPage.css";
import { numberWithCommas } from "../Components/Banner/Carousel";

function CoinPage() {
  //for getting variables from the URL
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CrypState();
  const fectCoinData = async () => {
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    setCoin(data);
  };

  useEffect(() => {
    fectCoinData();
    // eslint-disable-next-line
  }, []);
  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );
  return (
    <div className="container">
      <div className="sideBar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        ></img>
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography variant="subtitle2" className="description">
          {coin?.description.en.split(". ")[0]}
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontWeight: "bold",
              }}
            >
              RANK :&nbsp;&nbsp;
            </Typography>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontFamily: "montserrat",
              }}
            >
              {coin?.coingecko_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontWeight: "bold",
              }}
            >
              Current Prize :&nbsp;&nbsp;
            </Typography>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontFamily: "montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price.inr.toFixed(2))}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontWeight: "bold",
              }}
            >
              Market Cap :&nbsp;&nbsp;
            </Typography>
            <Typography
              variant="h5"
              className="rank"
              style={{
                fontFamily: "montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -9)
              )}
              B
            </Typography>
          </span>
        </div>
      </div>
      <div className="chart">
        <ChartInfo />
      </div>
    </div>
  );
}

export default CoinPage;
