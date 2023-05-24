const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config({ path: `./development.env` });

const Shared = require('./Routes/shared');

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port = process.env.PORT || 8000;

/* Swagger API initialization Served */

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Auth App API",
      version: "1.0.0",
      description: "Murtaza api created",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./Routes*.js"],
};
const specs = swaggerJsDoc(options);

/* Static Content Served */

// app.use("/", express.static(path.join(__dirname, "public/auth-dashboard")));

app.use("/assets", express.static(path.join(__dirname, "Assets")));

/* Swagger Route Served */

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/* Deals with the CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* Routes defined for all module */
app.get("/",(req,res) => {
  return res.sendStatus(200)
})

app.use('/api',Shared);

// error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "";
  let errorData = [];

  if (error.data) {
    errorData = error.data;
  }
  res.status(status).json({
    message: message,
    status: "failure",
    statusCode: status,
    error: errorData,
  });
});

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, "localhost", (res, err) => {
      if (err) {
        onError(err);
      }
      console.log("Server Listening on port: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function onError(error) {
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.log(process.env.PORT + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.log(process.env.PORT + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
