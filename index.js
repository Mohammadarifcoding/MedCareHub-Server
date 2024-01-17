const express = require('express');
const connectDB = require('./src/db/connectDB');
const router = require('./src/routes');
const globalErrorHandler = require('./src/utils/globalErrorHandler');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


// all router access here 

app.use(router)



// connection database here 
app.get("/health",(req,res)=>{
    res.send('life drop server is running')
})


app.all('*',(req,res,next)=>{
    const error = new Error(`can't find ${req.originalUrl}on the server`)
    error.status = 404;
    next(error)
})

app.use(globalErrorHandler)


const main = async () =>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`life drop server is running on port ${port}`);
    });
}

main()

module.exports = app; 