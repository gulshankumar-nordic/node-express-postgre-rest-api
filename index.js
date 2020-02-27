const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const courses = require("./routes/courses");
const user = require("./routes/userauth");
const db = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(express.json());

app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/courses", courses);
app.use("/api/v1/user", user);
//app.use(erroHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));
