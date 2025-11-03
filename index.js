const express = require('express');
const urlRoute = require('./routes/url')
const {connectToMongoDB} = require('./connect')
const URL = require('./models/url')

const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log('Connected to Mongo'))

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory: {timestamp: Date.now()},
    }}
)
res.redirect(entry.redirectedURL);
 }) ;

app.listen(PORT, ()=>{console.log(`listening at PORT: ${PORT}, use http://localhost:${PORT}`)})