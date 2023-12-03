const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
dotenv.config()
app.use(cors());

const userRouter = require('./router/users')
const teamRouter = require('./router/team')

const MONGO_URL = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connect with mongoDB");
    } catch (err) {
        console.log(err)
    }
}
connectDB();




app.get('/', (req, res) => {
    res.send("Welcome")
})

app.use('/post/api', userRouter)
app.use('/get/api', userRouter)
app.use('/put/api', userRouter)
app.use('/delet/api', userRouter)
app.use('/team/api', teamRouter)
app.use('/team/api', teamRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
