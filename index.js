const userRouter = require("./Routing/router")
const cors = require('cors');

const express = require('express')

const cookieParser = require('cookie-parser')

const dotenv = require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors());



require('./DB/connection')




app.use("/User",userRouter)

app.use("/login",userRouter)

app.use("/update",userRouter)

app.use((err ,req ,res ,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log("server is running at port: " + PORT))