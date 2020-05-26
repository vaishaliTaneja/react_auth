const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const app = express();

authRoutes(app);
mongoose.connect(keys.mongoURI);
const PORT = process.env.PORT || 5000;
app.listen(PORT);