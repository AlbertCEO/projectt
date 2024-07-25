const express = require('express')
const mongoose = require('mongoose')



const dataSchema = new mongoose.Schema({
  amount: Number,
  base: String,
  symbols: String,
  currency: String
},
{ timestamps: true}
)

const Data = mongoose.model("Data", dataSchema)

module.exports = Data;