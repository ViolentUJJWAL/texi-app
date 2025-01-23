const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }
));


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));

module.exports = app;