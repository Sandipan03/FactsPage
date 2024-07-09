import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import factroutes from './routes/facts.js'
import userroutes from './routes/users.js'
import {} from 'dotenv/config'

const app= express()
app.use(cors())
app.use(express.json())

app.use('/',(req,res,next)=>{
    console.log(req.method,req.path);
    next();
})
app.use('/api/facts',factroutes)
app.use('/api/users',userroutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Database is connected and server is running on port ',process.env.PORT)
    })
    
    })
    .catch((err)=>{
        console.log(err);
})