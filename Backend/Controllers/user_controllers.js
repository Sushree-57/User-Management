const User = require("../Models/user");

User.sync();

// insert user details to database
const save = (req, res) => {
  const new_user = {
    fullName: req.body.fullName,
    userName:req.body.user,
    password:req.body.password,
    mobile:req.body.mobile
  };
  User.create(new_user).then(result=>{
     return res.status(201).json({ 
        message:'User Added Successfully',
        id:result.id
    });
  }).catch(error=>{
    return res.status(500).json({ 
        message:'Something went wrong',
        error:error
    });
  });
};

// fetch user details by id
const userById = (req, res) => {
    User.findByPk(req.params.id).then(result=>{
        return res.status(201).json({ 
            message:'User Fatched By Id Successfully',
            User:result
        });
      }).catch(error=>{
        return res.status(500).json({ 
            message:'Something went wrong',
            error:error
        });
      });
};
//fetch all user details
const index = (req, res) => {
    User.findAll().then(result=>{
         return res.status(201).json(result);
      }).catch(error=>{
        return res.status(500).json({ 
            message:'Something went wrong',
            error:error
        });
      });
};
//patch user details
const update = (req, res) => {
    const id = req.params.id;
    const update_user = {
        fullName: req.body.fullName,
        userName: req.body.userName,
        mobile: req.body.mobile,
      };
      User.update(update_user,{where:{id:id}}).then(result=>{
        return res.status(201).json({ 
            message:'User Update Successfully',
        });
      }).catch(error=>{
        return res.status(500).json({ 
            message:'Something went wrong',
            error:error
        });
      });
};
//delete user
const drop = (req, res) => {
    const id = req.params.id;
    console.log(id);
      User.destroy({where:{id:id}}).then(result=>{
        return res.status(201).json({ 
            message:'User deleted Successfully',
        });
      }).catch(error=>{
        return res.status(500).json({ 
            message:'Something went wrong',
            error:error
        });
      });
};



module.exports={save, userById, index, update, drop};