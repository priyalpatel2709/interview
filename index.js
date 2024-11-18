const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const si = require("systeminformation");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const orationsRouters = require("./routes/interviewQue");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, resp) => {
  const htmlContent = "<h1>Hello, Server is Running (Inter View) 😁</h1>";
  si.cpu()
    .then((data) => resp.send(data))
    .catch((error) => resp.send(error));
});

app.use("/api/interview", orationsRouters);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9800;
const server = app.listen(PORT, () => {
  console.log(`server is running on PORT http://localhost:${PORT}`);
});
