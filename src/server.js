const express = require("express");
const userRoutes = require("./routes/userRoutes");
const path = require('path');
require("dotenv").config({ path: "src/.env" });
const ConnectMongoDB = require("../src/database/database");

const app = express();

ConnectMongoDB();

app.use(express.json());
app.use("/api", userRoutes);
app.use(express.static(path.join(__dirname, 'views')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
});

console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);