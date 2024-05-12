const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const voterRouter = require("./routes/voterRoutes.js");
const candidateRouter = require("./routes/candidateRoutes.js");
const db = require("./config/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/voter", voterRouter);
app.use("/candidate", candidateRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
