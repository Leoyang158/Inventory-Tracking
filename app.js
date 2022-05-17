//API interface 
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
//Error Async 
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//middleware
const { isLoggedIn, isAuthr, validateVehicle } = require('./middleware')

//validation schema 
const { vehicleSchema, reviewSchema } = require('./schemas.js');

//models MongoDB
// const Vehicle = require('./models/vehicle');
// const Review = require('./models/review');

//router links e
const listsRoute = require('./routes/lists');
const aboutRoute = require('./routes/about');
const contactRoute = require('./routes/contact');
const usersRoute = require('./routes/users');
const searchRoute = require('./routes/search');
const reviewsRoute = require('./routes/reviews');

//connecting to MongoDB 
mongoose.connect('mongodb://localhost:27017/vehicleShow', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,   
    useCreateIndex: true,
    useFindAndModify: false
});

//validation for the conenction with MongoDB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sessionConfig = {
    secret: "thisisbetter!",
    resave: false, // this two lines make session deprecation warning go away 
    saveUninitalized: true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24  * 7,
        maxAge: 1000 * 60 * 60 * 24  * 7 
    }
    // we don't want the user to stay forever in our web once they sign in
}

const app = express();

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(methodOverride('_method'));

app.use(session(sessionConfig)) //making sure it's before the passport session 
app.use(flash())

//passport middleware (if we want persistent login session)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // we want to access the localstragy within the user's model

passport.serializeUser(User.serializeUser()); //used to store the user in the session 
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

//app.use different links 
app.use('/', usersRoute)

app.use('/lists', listsRoute)

app.use('/lists/:id/reviews', reviewsRoute)

app.use('/search', searchRoute)

app.use('/about', aboutRoute)

app.use('/contact', contactRoute)



app.get('/', (req, res) => {
    res.render('welcome')
});

//this page will be presented if above webpage doesn't exist 
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
}) 

// Something can't be reached, then enter to this webpage
app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).render('error', {err})
})

//connecting to the ports 
app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
