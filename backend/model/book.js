import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  cellNumber: String,
  dateRegister: {
    type: Date,
    default: Date.now,
  },
});

const book = mongoose.model("books", schema);
export default book;