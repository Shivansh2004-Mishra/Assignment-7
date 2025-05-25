const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use('/', todoRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});