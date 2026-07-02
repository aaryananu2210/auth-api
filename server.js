require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 🚀"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});