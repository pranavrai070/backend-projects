const express =require('express');
const path =require('path');
const dotenv=require('dotenv');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const passport=require('passport');
const session =require('express-session');
const connectDB=require('./config/db')
const routes=require('./routes/index');
const authRoutes=require('./routes/auth');

//Load config
dotenv.config({path:'./config/config.env'});

//Passport config
require('./config/passport')(passport)



//databse connect
connectDB();

//initialize app
const app=express();

//Logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

//routes
app.use('/',routes);
app.use('/',routes);

//handleBars
app.engine('.hbs', exphbs.engine({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');


//Sessions
app.use(session({
    secret:'test',
    resave:false,
    saveUninitialized:false
}))

//passport middleware
app.use(passport.initialize);
app.use(passport.session);


//static folder
app.use(express.static(path.join(__dirname,'public')))


const PORT=process.env.PORT||5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

