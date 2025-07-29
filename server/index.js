const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const connectdb=require("./db/db");
const route  = require('./routes/userRoutes');


connectdb()

app.use(cors());
app.use(express.json());

app.use(route)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
