const express = require('express');
const connectDB= require('./database/connect');
const app = express();
const router = require('./routes/users');
const env = require('dotenv')
const port = 3000;
const cors = require('cors')
                 
env.config();
// Middle Ware 
app.use(express.json());
//Middle ware for browser
// app.use(express.static(''))

//Base Route
app.use(cors());
app.use('/user',router) 



const start = async()=>{
   
        try {
            await connectDB(process.env.DB_URL)
            app.listen(port,console.log(`listening to port ${port}`))
        } catch (error) {
            console.log(error);
        }
    
}

start()







