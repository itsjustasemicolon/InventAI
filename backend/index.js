const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("How to connect to ML model ??");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
