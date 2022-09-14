import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../../config/api";
import "./Carousel.css";
import { CrypState } from "../../CrypContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
export function numberWithCommas(x) {
  //INDIAN ====>(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
  //USA  =====>(/\B(?=(?:\d{3})+(?!\d))
  return x.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}
function Carousel() {
  const [trending, settrending] = useState([]);
  const { currency, symbol } = CrypState();
  const fectCoinData = async () => {
    const res = await fetch(TrendingCoins(currency));
    const data = await res.json();
    settrending(data);
  };

  useEffect(() => {
    fectCoinData();
    // eslint-disable-next-line
  }, [currency]);
  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className="carouselItem">
        <img src={coin?.image} alt={coin.name} height="80"></img>
        <span style={{ padding: 5 }}>
          {" "}
          {coin?.symbol}&nbsp;
          <span
            style={{
              color: profit > 0 ? "green" : "red",
              fontWeight: 500,
              padding: 5,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, padding: 4 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };
  return (
    <div className="carousel">
      <AliceCarousel
        infinite
        autoPlay
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
}

export default Carousel;
