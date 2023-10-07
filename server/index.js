const express=require('express');
const Connection=require('./db')
const cors = require('cors')


const app=express();
app.use(cors())
app.use(express.json())
app.get("/",(req,resp)=>{
    resp.send("work done")
})

// available routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes'))

app.listen(4000)
Connection();