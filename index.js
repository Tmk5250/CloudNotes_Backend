const express = require('express')
const connection = require('./db');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(express.json())

// Cors policy package 
app.use(cors())

//port
const port = 80;

// body parser related stuff 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connecting to mongo 
connection();

// Routing for app
app.use('/api/signUp', require('./Routes/signUp'))
app.use('/api/login', require('./Routes/login'))
app.use('/api/getUser', require('./Routes/getUser'))
app.use('/api/note', require('./Routes/note'))
app.use('/api/myNotes', require('./Routes/myNotes'))
app.get('/',(req,res)=>{
  res.send('hello')
})

//Handling unexpected errors and restarting the server
process.on("unhandledRejection",err =>{
  console.log(`Thi sis unhandled error `);
  console.log(`---------------------------------`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

