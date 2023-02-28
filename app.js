const express = require('express')
const connection = require('./connection/connection')
const contactManager = require('./routes/contact-manager')
connection()
const app = express()

app.use("/v1/contacts", contactManager)

app.get("*", (req,res)=>{
    res.status(404).send("API IS NOT FOUND")
})

app.listen(3000, ()=>{console.log('listening on port 3000')})