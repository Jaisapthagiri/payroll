import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => 
            console.log("Connected successfully"))
            await mongoose.connect(`${process.env.MONGO_URI}/payroll`)
    } catch (error) {
        console.log(error.message);
    }
}