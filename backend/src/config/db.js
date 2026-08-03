import dns from "dns";
import mongoose from "mongoose";

// Windows router DNS often refuses Node SRV queries needed by mongodb+srv
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
