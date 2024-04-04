import storedUserApi from "../Model/UserApiSchema.js";
import userTeamSchema from "../Model/UserTeam.js";
import mongoose from "mongoose";
export const userData= async(req, res)=>{

   try {

    const page= parseInt(req.query.page)||1;
    const pageSize= 20;
    const skip = (page - 1) * pageSize;

    const getUsersData= await storedUserApi.find();
    
    if (getUsersData.length === 0) {
        return res.status(404).json({ message: "No data available" });
    }

    if (skip >= getUsersData.length) {
        return res.status(404).json({ message: "Page not found" });
    }

    const totalPages= Math.ceil(getUsersData.length/pageSize);

    const showLimitedData = getUsersData.slice(skip, skip + pageSize);


    return res.status(200).json({message:"Data Successfully Fetched", totalPages, showLimitedData});

   } catch (error) {
    console.log(error);
    return res.send("Unable To Fetch The Data");
   }
}


export const searchUserDetails= async(req, res)=>{
    try {
        const {name}= req.query;

         const findUserDetails= await storedUserApi.find();

         if (!name) {
            return res.send('not data')
         }


         const userDetails= findUserDetails.filter(userData=>userData.first_name.toLowerCase().includes(name.toLowerCase()));

         if (!userDetails) {
              return res.status(404).json({message:"Failed To Found User Data"});
         }

         return res.status(200).json({message:"User Details Successfully Found", userDetails});

    } catch (error) {
        console.log(error);
        return res.send("Failed To Search The User");
    }
}

 
 export const addUser= async(req, res)=>{
    try {
        const userId= req.userId;
        const {addUserData}= req.body;
        if (!userId) {
            return res.status(401).json({message:"UnAuthorized User"});
        }

        if (!addUserData) {
            return res.status(404).json({message:"Provide User You Want Add"});
        }

     const getUserTeam= await userTeamSchema.findOne({userId})

          if (!getUserTeam) {
            const createNewUserTeam= new userTeamSchema({userId, userTeam:[addUserData]});

                 await  createNewUserTeam.save()
             return res.status(200).json({message:"User Successfully Added To Team", createNewUserTeam});    
          }

          const addUserInTeam= getUserTeam.userTeam.push(addUserData);

          await getUserTeam.save();

          return res.status(200).json({message:"User Successfully Added To Team", getUserTeam});    
    } catch (error) {
        console.log(error);
        return res.send("Failed To Create Team");
    }
}


export const getUserTeam= async(req, res)=>{
    try {
        const userId= req.userId;
        if (!userId) {
            return res.status(401).json({message:"UnAuthorized User"});
        }

     const getUserTeam= await userTeamSchema.findOne({userId})

          return res.status(200).json({message:"User Successfully Added To Team", getUserTeam});    
    } catch (error) {
        console.log(error);
        return res.send("Failed To Create Team");
    }
}

export const removeUser= async(req, res)=>{
    try {
        const {id:_id}=req.params;
 
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Failed To Find User')
        }
 
 
      await userTeamSchema.updateMany({}, {$pull:{userTeam:{_id}}});
 
          return res.status(200).json({message:"User SuccessFully Remove"});    
    } catch (error) {
        console.log(error);
        return res.send("Failed To Remove User");
    }
 }
