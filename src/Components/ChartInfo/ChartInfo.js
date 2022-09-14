import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../../config/api";
import { CrypState } from "../../CrypContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./ChartInfo.css";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { chartDays } from "../../config/daysData";
import SelectButton from "./SelectButton";
function ChartInfo() {
  const { id } = useParams();
  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CrypState();
  const fetchChartData = async () => {
    const res = await fetch(HistoricalChart(id, days, currency));
    const data = await res.json();
    setHistoryData(data.prices);
  };

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line
  }, [days]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="ChartContainer">
        {!historyData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <div style={{ width: "60vw" }}>
            <Line
              data={{
                labels: historyData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} :${date.getMinutes()}  PM`
                      : `${date.getHours()} :${date.getMinutes()}  AM`;

                  return days === 1 ? time : date.toDateString();
                }),
                datasets: [
                  {
                    data: historyData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            ></Line>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 20,
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChartInfo;
