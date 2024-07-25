const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcryptjs = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const Data = require('./models/data.model.js')
dotenv.config();

const port = 3000

const app = express();

app.use(express.static(__dirname));

app.use(express.json())
app.use(cookieParser());


mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('Connected to MongoDb');
})
.catch((err) => {
    console.log(err);
})






app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.post('/google', async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const usernameran = req.body.name
      const newUser = new User({
        username:
          req.body.username.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/sendpost', async (req, res) =>{
  const { amount, symbols, base, currency } =  req.body
  console.log(req.body)

  const newData = new Data({amount, symbols, base, currency});
  try {
    await newData.save();
    res.status(201).json({message: "Data Saved Successfully"})
  } catch (error) {
    res.send(error)
  }
})

app.post('/signup', async (req, res) => {
    const {username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
    res.status(201).json({message: "Client Profile Created Successfully"})
    } catch (error) {
        
    }
})


app.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(404, 'User not found');
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(401, 'wrong credentials');
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  });


  








app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})


// albertcanada312

//  i3uGeea6UIWlJBxo

// mongodb+srv://albertcanada312:<password>@cluster0.fare4mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// // const hashedPassword = bcryptjs.hashSync(password, 10);