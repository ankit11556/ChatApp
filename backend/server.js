const dotenv = require('dotenv')
const connectDb = require('./config/db')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')

connectDb();

app.use(express.json());
app.use(cors())

const userRotute = require('./routes/userRoutes')

app.use('/api/v1/user',userRotute)

app.get("/",(req,res)=>{
  res.send("API is running...")
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})