const express=require("express")
const app =express()

// telling node js to set view engine
app.set('view engine','ejs')






app.use(express.json) // form bata li nodejs lai vanna lai

// from bata airacha parse gar or handle gar vancxah yo code le
app.use(express.urlencoded({extended:true}))



// allblogs
app.get('/',(req,res)=>{
    res.render('blogs') // blogs.ejs halda ni huncah
})

//createBlog
app.get('/createBlog',(req,res)=>{
    res.render('createBlog')
})

//createBlog post 
app.post("/createBlog",(req,res)=>{
    console.log(req.body)
    //req.body.title or description ni halna milcha 
    res.send("form submitted successfully")
    
})
//createBlog set 


app.listen(3000,()=>{
    console.log("Node Js project ")
})