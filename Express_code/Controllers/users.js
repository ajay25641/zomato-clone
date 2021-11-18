const User = require("../Models/users");
exports.userSignUp = (req, res) => {
   const { email , pwd , FN , LN } = req.body;
   const user = new User({
       email:email,
       password:pwd,
       firstName:FN,
       lastName:LN
   })
   user.save().then((response)=>{
       res.status(200).json(response);
   }).catch(err=>{
       res.status(500).json(err);
   })
};
 exports.userLogin = (req , res)=>{
     const {email , password} = req.body;
     User.find({email:email , password : password}).then(response =>{
         if(response.length > 0){
             res.status(200).json({isAuthenticated : true })
         }
         else{
             res.status(200).json({isAuthenticated : false})
         }
     }).catch(err =>{
         res.status(500).json(err);
     })
 }