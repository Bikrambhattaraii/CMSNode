const express = require('express')
const app = express()
require('dotenv').config() // requiring dotenv and initiliazing it with default configuration 
const cookieParser = require('cookie-parser')

//ROUTES HERE 
const blogRoute = require("./routes/blogRoute")
const authRoute = require("./routes/authRoute")

// database connection 
require("./model/index")

// telling the nodejs to set view-engine to ejs
app.set('view engine','ejs')

// nodejs lai  file access garna dey vaneko 
app.use(express.static("public/"))
app.use(express.static("uploads/"))

app.use(cookieParser())
// form bata data aairaxa parse gara or handle garne
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    res.locals.currentUser = req.cookies.token
    next()
})


app.use("",blogRoute) // localhost:3000 + /createBlog === localhost:3000/createBlog
app.use("",authRoute) //localhost:3000/register



app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})
