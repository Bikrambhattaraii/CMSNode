const nodemailer = require("nodemailer");

// var options ={
//     email : "asdf",
//     subject : "",
//     otp : ""
// }
// options.email
const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "bikram bhattaarai <demo@gmail.com>", // yesma jasto fgormat rakhda ni huncha esma hello world rakhenni jancha
    to: options.email,
    subject: options.subject,
    text: "Your otp is  " + options.otp,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
