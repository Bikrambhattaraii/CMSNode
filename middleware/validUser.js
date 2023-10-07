const { blogs } =require('../model/index')
exports.isValidUser= async(req,res,next)=>{
    const userId=req.userId
    const id= req.params.id
    const oldDatas = await blogs.findAll({
        where: {
          id: id,
        },
      });
      if(oldDatas[0].userId  !== userId){
        return res.send("you cannot edit this blog")
         
      }
      next();
}