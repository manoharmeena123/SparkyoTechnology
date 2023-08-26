const express = require("express");
const cors = require("cors");
const app = express();
const winston = require("winston");
const expressWinston = require("express-winston");

app.use(express.json());
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

// Define your Winston logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'warn.log',
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// Set up Express middleware for logging using Winston
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false
}));

const { authenticate } = require("./middleware/authenticate")
const { connection } = require("./config/config");
const { userRouter } = require("./routes/user.route")
const { itemRouter } = require("./routes/item.route")
const { customerRouter } = require("./routes/customer.route")
const { deliveryRouter } = require("./routes/deliveryVehicles.route")
const { orderRouter } = require("./routes/order.route")

app.get("/", (req, res) => {
  logger.info("Request to / route");
  console.log(req.cookies);
  res.json("Welcome");
});

app.use("/user", userRouter);
app.use(authenticate)
app.use("/item", itemRouter);
app.use("/customer",customerRouter)
app.use("/order", orderRouter)
app.use("/delivery", deliveryRouter)

//Port===================================================>
app.listen(process.env.port, async () => {
  try {
    await connection;
    logger.info("Connected to DB");
  } catch (error) {
    logger.error(error);
  }
  logger.info("Server on 8000");
});
