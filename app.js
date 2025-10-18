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


const user = require('./routes/user');
const task = require('./routes/task')
const bid = require('./routes/bid')

app.use('/api', user)
app.use('/api', task)
app.use('/api', bid)

module.exports = app