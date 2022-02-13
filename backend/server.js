const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const info = require("./data/demoData");
//conect database
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//dotenv config
dotenv.config();

connectDB();
const app = express();

//accept json data from user 
app.use(express.json())

//port
const PORT = process.env.PORT || 5000;

//route

// app.get("/", (req, res) => {
//   res.send("Api is running");
// });

// app.get("/api/info", (req, res) => {
//   res.send(info);
// });
// app.get("/api/info/:id", (req, res) => {
//   res.send(info.find((item) => item.id === req.params.id));
// });

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

//creating server

app.listen(PORT, console.log(`Server started on Port ${PORT} `));
