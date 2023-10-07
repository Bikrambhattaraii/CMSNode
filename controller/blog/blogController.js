const { blogs, users } = require("../../model");
const fs = require("fs"); //fs= filesystem yo package chai file  update deleete garna use garcha

exports.renderCreateBlog = (req, res) => {
  res.render("createBlog");
};
exports.createBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const subTitle = req.body.subtitle;
  const fileName = req.file.filename;
  if (!title || !description || !subTitle || !req.file) {
    return res.send("Please provide title,description,subTitle,file");
  }
  // database ma halnu paryo , database sanaga kehi operation await halnu parney hunchha
  // agadi , await halepaxi mathi async halnu parcha
  await blogs.create({
    title: title,
    subTitle: subTitle,
    description: description,
    userId: req.userId,
    image: process.env.PROJECT_URL + fileName,
  });
  res.redirect("/");
  // res.json({
  //     status : 200,
  //     message : "Blog created sucesfully"
  // })
};
exports.allBlog = async (req, res) => {
  //blogs vanney table bata vayko savai data dine vanne
  const allBlogs = await blogs.findAll();

  // blogs vanney key/name ma allBlogs/data pass gareko ejs file lai
  res.render("blogs", { blogs: allBlogs });
  // res.json({
  //     status : 200,
  //     blogs : allBlogs
  // })
};
exports.singleBlog = async (req, res) => {
  const id = req.params.id;
  // second approach
  // const {id} = req.params
  // id ko data magnu/find garnu paryo hamro table bata
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
    include: {
      model: users,
    },
  });
  res.render("singleBlog", { blog: blog });
};
exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  // blogs vanney table bata tyo id ko delete gar vaneko yaha
  await blogs.destroy({
    where: {
      id: id,
    },
    include: {
      model: users,
    },
  });
  res.redirect("/");
};
exports.renderEditBlog = async (req, res) => {
  const id = req.params.id;
  // find blog of that id
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
  });

  res.render("editBlog", { blog: blog });
};

exports.editBlog = async (req, res) => {
    const userId =req.userId  // cehck garne ko main author ho jasle edit delete paucha
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subtitle;
  const description = req.body.description;
//   const oldDatas = await blogs.findAll({
//     where: {
//       id: id,
//     },
//   });
//   if(oldDatas[0].userId  !== userId){
//     return res.send("you cannot edit this blog")
//   }
  let fileUrl;
  if (req.file) {
    fileUrl = process.env.PROJECT_URL + req.file.fileName;
  } else {
    fileUrl = oldDatas[0].image;
  }

  await blogs.update(
    {
      title: title,
      subTitle: subTitle,
      description: description,
      image: fileUrl,
    },
    {
      where: {
        id: id,
      },
    }
  );
// fs.unlink('uploads\file.txt',(err)=>{
//     if(err){
//         console.log("error caught",err)
//     }else{
//         console.log('deleted')
//     }
// })
const oldImagePath =oldDatas[0].image
console.log(oldImagePath)  //http://localhost:3000/1696255433914-WWW.YIFY-TORRENTS.COM.jpg yo link oldimage ma basya cha
lengthUnwanted ="http://localhost:3000/".length 
 console.log(lengthUnwanted)
const fileNameInputFolder= oldImagePath.slice(lengthUnwanted)
console.log(fileNameInputFolder)
fs.unlink('uploads/'+fileNameInputFolder,(err)=>{
    if(err){
        console.log("error while deeleting the filke",err)
    }else{
        console.log("file deleted successfully")
    }
})
  res.redirect("/single/" + id);
};

exports.renderMyBlogs = async (req, res) => {
  // get this users blogs
  const userId = req.userId;
  // find blogs of this userId
  const myBlogs = await blogs.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("myBlogs.ejs", { myBlogs: myBlogs });
};
