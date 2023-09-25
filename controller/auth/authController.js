const { users } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

exports.renderRegisterform = (req, res) => {
  res.render("register");
};
exports.registerUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  //const email=req.body.email yesari chutai chutai garda ni huncha emaill pass username lai

  // data base ma insert hunu vanda agi check
  if (password.toLowerCase() !== confirmPassword.toLowerCase())
    //lowercase lada ni hjuncha nalada ni huncah
    return res.send("password didnot matched");
  // tolowercase nahalda if pw uppercsae ra lowercase cha vane ni password nmatch

  //insert into table(users)
  await users.create({
    email,
    password: bcrypt.hashSync(password, 8),
    username, // mathi ko variable use gareko
  });
  res.redirect("/login");
};
exports.renderLoginForm = (req, res) => {
  console.log(req.body);
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("email and password are required ");
  }

  const associateDataWithEmail = await users.findAll({
    where: {
      email,
    },
  });
  if (associateDataWithEmail.length == 0) {
    res.send("email doesnt exisst");
    //data exist chaina vane o huncha length
  } else {
    const associatedEmailPassword = associateDataWithEmail[0].password;
    const isMatched = bcrypt.compareSync(password, associatedEmailPassword); // true or false return garcha
    if (isMatched) {
      //generate token
      //login success vayesi token banaucha
      const token= jwt.sign({id:associateDataWithEmail},process.env.SECRETKEY,{
        expiresIn:"30d"  //30 day ma token kam gardaina login hudaina
      }) 
      //.env file ma secret key rakhda milcha
      res.cookie('token',token,{
        secure:true,
        expiresIn:120
      })
   console.log("this is token"+token)  // browser ma application vitra cokkie ma save huncha

      res.sned("logged in succesfullyu");
    } else {
      res.send("invalid password");
    }

    //checking if password also matches
  }
  //
};
