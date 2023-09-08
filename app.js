const express= require("express")
const { blogs } = require("./model/index")
const { EDGE_RUNTIME_WEBPACK } = require("next/dist/shared/lib/constants")
const app =express()
// telling node js to set view engine
app.set('view engine','ejs')
app.use(express.json) // form bata li nodejs lai vanna lai
// from bata airacha parse gar or handle gar vancxah yo code le

// database connection 
require('./model/index')
app.use(express.urlencoded({extended:true}))
// allblogs
app.get('/', async(req,res)=>{
    // table bata data nikalnu paryo
     const allBlogs = await blogs.findAll()  //mongodb .find()  // blogs ko table ko data allBlogs ma store
     console.log(allBlogs)
    res.render('blogs',{blogs:allBlogs}) // blogs ma ako data all blogs ma pass garne {blogs:allBlogs} le ejs file lai  
    // blogs.ejs halda ni huncah
})
//createBlog
app.get('/createBlog',(req,res)=>{
    res.render('createBlog')
})
// single blog
app.get('/singleBlog:id',async(req,res)=>{
    const id =req.params.id
    // 
    // const{id}=req.params
    console.log(req.params.id)
    res.render('singleBlog')

    // id ko data magne orfind garne table bata
  await  blogs.findAll({
        where:{
            id:id
        }
    })
  

    console.log(blog)
    res.render('singleBlogs',{blog:blog} )
})

//createBlog post 
app.post("/createBlog",async (req,res)=>{
    // const title =req.body.title 
    // const description =req.body.description
    // const subTitle= req.body.subTitle
    // desctructuring previous 
 const{title,subTitle,description }=req.body
 console.log(title.description.subTitle)
//database ma halni
// database ma input puraucha
 await blogs.create({  // kei time lagcha db ma halna nikalna so await use garne
    title: title,
    subTitle:subTitle,
    description:description,  
 })  
 
    //req.body.title or description ni halna milcha 
    res.redirect("/") 
})
// find() database bata tanne
//createBlog set 
app.listen(3000,()=>{
    console.log("Node Js project ")
})