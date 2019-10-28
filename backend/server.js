const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  app = express(),
  port = process.env.PORT || 6969,
  userRoute = require('./api/routes/userRoute'),
  postRoute = require('./api/routes/postRoute'),
  itemRoute = require('./api/routes/itemRoute'),
  retailerRoute = require('./api/routes/retailerRoute');
  tagRoute = require('./api/routes/tagRoute');
require('dotenv').config();

const uri = process.env.ATLAS_URI || "mongodb+srv://Test:Test123@cs160-cluster-gigd4.mongodb.net/Soigne?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use CORS
app.use(cors());

// Use built-in bodyparser
app.use(express.json());

// Register routes
userRoute(app);
postRoute(app);
itemRoute(app);
retailerRoute(app);
tagRoute(app);

// Error message for 404
app.use(function (req, res) {
  res.status(404).send("404 Error");
});

app.listen(port, () => {
  console.log(`Soigne Server is running on port: ${port}`);
});