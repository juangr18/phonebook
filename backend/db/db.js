import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successful");
  } catch (e) {
    console.log("Error to cooneting to DB \n", e);
  }
};

export default { dbConnect };
