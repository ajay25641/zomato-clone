const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Router/index");

const PORT = process.env.PORT || 2109;
const host = "0.0.0.0";
const dbUrl =
  "mongodb+srv://developer_ajk:ajay@12345@cluster0.c65dz.mongodb.net/zomato_DB?retryWrites=true&w=majority";
const app = express();
app.use(cors({
  origin:"*",
}));
app.use(express.json());
app.use("/", router);

mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then((res) => {
    app.listen(PORT, host, () => {
      console.log(`Server is running on ${host}:${PORT} `);
    });
  })
  .catch((err) => console.log(err));
