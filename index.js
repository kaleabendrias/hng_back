const express = require("express");
const apiroute = require("./routes/apiroute");

const app = express();

PORT = process.env.PORT;

app.set("trust proxy", true);

app.use("/api", apiroute);

app.listen(PORT || 3000, () => {
  console.log("Server is running");
});
