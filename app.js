const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const { apiLimiter } = require("./middlewares/rateLimiter");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(apiLimiter);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resort booking API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
