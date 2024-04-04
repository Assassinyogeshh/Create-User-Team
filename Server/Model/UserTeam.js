import mongoose from "mongoose";

const createTeam= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },

    userTeam:[
        {
            id:String,
            first_name:String,
            last_name:String,
            email:String,
            gender:String,
            avatar:String,
            domain:String,
            available:String,
        }
    ]
    
});

const userTeamSchema= mongoose.model("user_team", createTeam);

export default userTeamSchema;