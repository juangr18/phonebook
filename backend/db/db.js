import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
    } catch (e) {
        
    }
};


