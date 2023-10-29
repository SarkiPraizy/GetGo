
require('dotenv').config()
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL

console.log(process.env.MONGODB_URL)
const dbURI = 'mongodb://localhost/Tododb';

const mongoDbConnection=()=>{
    mongoose.connect(MONGODB_URL)
    mongoose.connection.on("connected",()=>{
        
        console.log('Database connected succefully')
    })
    mongoose.connection.on("error",(err)=>{
        console.log(`An error has occured ; ${err}`)
    })
 }
module.exports={mongoDbConnection}
