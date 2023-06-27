const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();
const port = 8080;


const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


mongoose.connect(process.env.MONGO_URL);


// testing api
app.get('/test', (req, res) => {
    res.json('test okay');
});

// user register api
app.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
    
        res.json({userDoc});
    }
    catch(e){
        res.status(422).json(e);
    }
});

// reserve-admin
// ESZVahxtdvvWnqvF

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})