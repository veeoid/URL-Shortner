const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url')
const {connectToMongoDB} = require('./connect')
const URL = require('./models/url')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middleware/auth')
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser')


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log('Connected to Mongo'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:false})); //to support form data.
app.use(cookieParser())

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);


app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory: {timestamp: Date.now()},
    }}
)
res.redirect(entry.redirectedURL);
});

// app.get('/user/:email', async (req, res)=>)

app.get('/')

app.listen(PORT, ()=>{console.log(`listening at PORT: ${PORT}, use http://localhost:${PORT}`)})