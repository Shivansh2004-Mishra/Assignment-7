const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('/', todoRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});