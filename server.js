/* eslint-disable no-undef */
//Import express
const express = require("express");
//Import dotenv
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
//Import morgan
const morgan = require("morgan");
//Import dbConnection
const dbConnection = require("./config/database");
//Import categoryRoute from routes
const categoryRoute = require("./routes/categoryRoute");
//Import class ApiError
const ApiError = require("./utils/apiError");
//Import globalError from middlewares folder from errorMiddleware.js
const globalError = require("./middlewares/errorMiddleware");

//Connect with database
dbConnection();
//take object or instance from express to use its methods
const app = express();

// Middlewares
app.use(express.json()); // to parse json to js object
//create route to ensure that the server is running on port 3000
//Use morgan middleware to logg API Reequest in mode  development
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// Mount Routes
//http://localhost:3000/api/v1/categories
app.use("/api/v1/categories", categoryRoute);

//Middleware to handle error that I cannot handle it (Such as URL Not found)
//Example --> URL --> http://localhost:3000/api/v2/categories
app.all(/.*/, (req, res, next) => {
  next(new ApiError(`Cannot find this route ${req.originalUrl}`, 400));
});

//Global error Handling Middleware to handle Error from(express-async-handler)
app.use(globalError);

const PORT = process.env.PORT || 3000;
//crrate the Server and run it on port 3000
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//Handling Rejections Errors outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("The Server Shutting down...");
    process.exit(1);
  });
});
