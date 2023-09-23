const { users } = require("../../model")
 const bcrypt = require('bcryptjs')

 
exports.renderRegisterform = (req,res)=>{
    res.render('register')
}
exports.registerUser =async(req,res)=>{
    const {email,username,password,confirmPassword}=req.body
    //const email=req.body.email yesari chutai chutai garda ni huncha emaill pass username lai


    // data base ma insert hunu vanda agi check
if(password.toLowerCase()  !== confirmPassword.toLowerCase())  //lowercase lada ni hjuncha nalada ni huncah
return res.send("password didnot matched")   
// tolowercase nahalda if pw uppercsae ra lowercase cha vane ni password nmatch

//insert into table(users)
 await users.create({
    email,
    password:bcrypt.hashSync(password,8),
    username, // mathi ko variable use gareko
})
res.redirect("/login")

}
exports.renderLoginForm= (req,res)=>{
    console.log(req.body)
}
exports.loginUser =(req,res)=>{
    
}