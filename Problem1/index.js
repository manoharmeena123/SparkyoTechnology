const express = require("express");
const cors = require("cors");
const expressWinston = require("express-winston");
const winston = require("winston");
const { connection } = require("./config/config");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/authenticate"); 
const {logger} = require("./middleware/logger")
const app = express();

// Middleware ======================================================>
app.use(express.json());
app.use(cookieParser()); 



// Set up Express middleware for logging using Winston
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false
    })
);

// Routers ======================================================>
const { userRouter } = require("./routes/user.route");
const { itemRouter } = require("./routes/item.route");
const { customerRouter } = require("./routes/customer.route");
const { deliveryRouter } = require("./routes/deliveryVehicles.route");
const { orderRouter } = require("./routes/order.route");


// Routes ======================================================>
app.get("/", (req, res) => {
    logger.info("Request to / route");
    res.json("Welcome");
});

app.use("/user", userRouter);
app.use(authenticate); 
app.use("/item", itemRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);
app.use("/delivery", deliveryRouter);

// Port======================================================>
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    try {
        await connection;
        logger.info("Connected to DB");
    } catch (error) {
        logger.error(error);
    }
    logger.info(`Server running on port ${PORT}`);
});


module.exports = app;