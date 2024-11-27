const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

"Above code is for enabling CORS in the backend server. It allows the frontend to make requests to the backend server."
//In memory data store
let stockItems = [];

//Route
app.get('/items', (req, res) => {
  res.json(stockItems);
});

app.post('/items', (req, res) => {
    const { name, quantity, expireDate } = req.body;
    const newItem = { id: Date.now(), name, quantity, expireDate };
    stockItems.push(newItem);
    res.status(201).json(newItem);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
