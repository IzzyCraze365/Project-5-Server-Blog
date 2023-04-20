// Project: Week 5
// Blog Server
// John Isabella III

require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./controllers/routes");

app.use(express.json()); // Allows us to send Data to JSON -Middleware
app.use(express.static(`${__dirname}/public`));
app.use("/routes", routes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
