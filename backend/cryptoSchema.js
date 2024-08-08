const express = require('express');
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://dhruv:dhruv@cluster0.qez2h.mongodb.net/crypto";

mongoose.connect(mongoURI).then(() => {
  console.log("Mongoose Connected");
  
});

const BTCSchema = new mongoose.Schema([{
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
}]);
const MATICSchema = new mongoose.Schema([
  {
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
  },
]);

const ETHSchema = new mongoose.Schema([{
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
}]);

const SOLSchema = new mongoose.Schema([
  {
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
  },
]);

const XRPSchema = new mongoose.Schema([
  {
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
  },
]);


const ETH = mongoose.model("ETH", ETHSchema);
const BTC = mongoose.model("BTC", BTCSchema);
const MATIC = mongoose.model("MATIC", MATICSchema);
const XRP = mongoose.model("XRP", XRPSchema);
const SOL = mongoose.model("SOL", SOLSchema);

module.exports = {
  ETH,BTC,MATIC,XRP,SOL
};