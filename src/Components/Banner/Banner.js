import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./Banner.css";
import Carousel from "./Carousel";
function Banner() {
  return (
    <div className="bannerImg">
      <Container className="bannerContainer">
        <div className="tagline">
          {" "}
          <Typography
            variant="h2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Tokken Tracker
          </Typography>
          <Typography
            variant="subtitle"
            style={{
              fontFamily: "Montserrat",
              textTransform: "capitalize",
              color: "darkgrey",
            }}
          >
            Get all the info regarding your favorite crypto tokken or
            currency....
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
