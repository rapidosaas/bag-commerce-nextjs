import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB error" + error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}