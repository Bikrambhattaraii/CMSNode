const express = require('express')
const app = express()

//routes
const blogRoute = require("./routes/blogRoute")
const authRoute=require('./routes/authRoute')

// database connection 
require("./model/index")

// view engine
app.set('view engine','ejs')

// poublic ma vako files haru excess garne
app.use(express.static("public/"))

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("",blogRoute) // localhost:3000 + /createBlog === localhost:3000/createBlog
app.use("",authRoute)  // register 
// if app.use('/auth',authRoute) yesari garya vaye localhost/auth/register hannu parcha
app.listen(3000,()=>{
    console.log("NodeJs project has started at port 3000")
})