require('dotenv').config()
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport')
const flash = require('connect-flash')
const port = process.env.PORT;
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(cors())
app.use(fileUpload())
//  passport config
require('./config/passport')(passport)
//  body parser
app.use(bodyParser.urlencoded({ extended: false }));
//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.json())


app.use("/public/images",express.static(path.join(__dirname, "public")))

// Connect flash
app.use(flash());

//  express session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/todo',require('./routes/todo'))

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('database connection sucessfull'))
    .catch((err) => console.log(err));
  console.log(`server start at http://localhost:${port}`);
});


