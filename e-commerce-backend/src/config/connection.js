require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// Connection preference:
// - In production: try MONGO_URI, then Atlas creds, then local
// - In development: prefer MONGO_URI, then local (avoid using Atlas creds set globally)
const atlasStr = process.env.MONGO_USERNAME && process.env.MONGO_PW
  ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0lmxga7.mongodb.net/fedecommerce?retryWrites=true&w=majority`
  : null;

let connectionStr;
if (process.env.NODE_ENV === "production") {
  connectionStr = process.env.MONGO_URI || atlasStr || "mongodb://localhost:27017/fedecommerce";
} else {
  connectionStr = process.env.MONGO_URI || "mongodb://localhost:27017/fedecommerce";
}

mongoose
  .connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("Mongo connection error:", err.message || err));

mongoose.connection.on("error", (err) => {
  console.log("Mongo connection error:", err);
});
