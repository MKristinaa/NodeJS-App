const express  = require('express');
const cors = require('cors');
const app  = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'https://agrishop-react.onrender.com',  
    credentials: true 
}));

app.use(express.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 


app.use(cookieParser());
app.use(fileUpload());


//Import all routes 
const products = require('./routes/product');
const user = require('./routes/user');
const order = require('./routes/order');
const task = require('./routes/task')
const bid = require('./routes/bid')

app.use('/api', products)
app.use('/api', user)
app.use('/api', order)
app.use('/api', task)
app.use('/api', bid)

module.exports = app