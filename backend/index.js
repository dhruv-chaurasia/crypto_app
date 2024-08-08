const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const axios = require("axios");
const { ETH, BTC, MATIC, XRP, SOL } = require("./cryptoSchema");
const APIKey = "0bd22b7b-c8ce-432f-83cc-686218565acd";
const PORT = 3001;


const arr = [SOL, BTC, MATIC, ETH, XRP];
const obj = {
  SOL: 0,
  BTC: 1,
  MATIC: 2,
  ETH: 3,
  XRP: 4,
};
const pollData = async () => {
  const symbols = ["SOL", "BTC", "MATIC", "ETH", "XRP"];
  for (let i = 0; i < symbols.length; i++) {
    try {
      const response = await axios.post(
        `https://api.livecoinwatch.com/coins/single`,
        {
          currency: "INR",
          code: `${symbols[i]}`,
          meta: true,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": APIKey,
          },
        }
      );
      await arr[i].create({
        symbol: response.data.name,
        price: response.data.rate,
        timestamp: new Date(Date.now()),
      });
    } catch (error) {
      console.error(`Error fetching data for ${symbols[i]}:`, error);
    }
  }
};

app.get("/api/prices/:symbol", async (req, res) => {
  try {
    const crypto = req.params.symbol;
    const prices = await arr[obj[crypto]]
      .find({})
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(prices);
  }
  catch (e) {
    res.json([]);
  }
  });

setInterval(pollData, 10000);
app.listen(PORT);
