
// const User= require('../Models/userModel')
// // controllers to create users 
// // Controller handles request and response and handles all Logic


// const createUser =async(req, res) =>{
//     // const data= req.body;
//     // const name= data.name;
//     // const age= data.age;
//     // const role= data.role;

//     // Deconstructure
//     const {name, email, password}=req.body;

//     // User instance
//     const addUser= new User({
//         name: name,
//         email: email,
//         password: password

//     });

//     try {
//          const response= await addUser.save();
//          if (response){
//             res.status(201).json({message:"user created succesfully" ,response})
//          }
//         }
//     catch(err){
//         res.status(500).json({message:"Internal server error" ,err})
//     }
// };

// module.exports= createUser;