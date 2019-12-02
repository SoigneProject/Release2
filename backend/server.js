const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  passport = require('passport'),
  port = process.env.PORT || 6969,
  userRoute = require('./api/routes/userRoute'),
  postRoute = require('./api/routes/postRoute'),
  itemRoute = require('./api/routes/itemRoute'),
  retailerRoute = require('./api/routes/retailerRoute'),
  tagRoute = require('./api/routes/tagRoute'),
  cookieParser = require('cookie-parser'),
  profileRoute = require('./api/routes/profileRoute');
require('dotenv').config();
require('./api/auth/auth');

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
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'       // Change depending on domain
}));

// Use built-in bodyparser
app.use(bodyParser.json());

// Cookie Parser
app.use(cookieParser('stronksecret'));

// Register routes
app.use('/users', userRoute);
app.use('/user', passport.authenticate('jwt', { session: false, failureRedirect: '/users/guest' }), profileRoute);
app.use('/items', itemRoute);
app.use('/posts', postRoute);
app.use('/retailers', retailerRoute);
app.use('/tags', tagRoute);

// Error message for 404
app.use(function (req, res) {
  res.status(404).send("404 Error");
});

app.listen(port, () => {
  console.log(`Soigne Server is running on port: ${port}`);
});