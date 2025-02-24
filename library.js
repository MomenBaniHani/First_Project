const express = require("express");
const cors = require("cors");
const filesR = require("./routes/filsR");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // for frontend
app.use("/api", filesR);
const port = 3001;
app.listen(3001, () => {
  console.log(`server has been started http://localhost:${port} `);
});
