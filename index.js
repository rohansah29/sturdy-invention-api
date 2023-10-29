const express = require("express");

const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { appointmentRouter } = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json())
app.use(cors());

app.use("/",userRouter)
app.use("/",appointmentRouter)

app.get("/", (req, res) => {
    res.send("Home Page");
  });


  app.listen(8080, async () => {
    try {
      await connection;
      console.log("Connected to the DB");
      console.log("Server is running at port 8080");
    } catch (error) {
      console.log(error);
    }
  });