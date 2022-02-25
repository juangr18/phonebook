import mongoose from "mongoose";
import book from "../model/book.js";

const schema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  cellNumber: Number,
  dateRegister: {
    type: Date,
    default: Date.now,
  },
});

const book = mongoose.model("books", schema);
export default book;