import mongoose from "mongoose";

const userApiSchema= new mongoose.Schema({
    id:{
        type:String,
        required:true
    },

    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    domain:{
        type:String,
    },
    available:{
        type:String,
    },
});

const storedUserApi= mongoose.model("storedUserApi", userApiSchema);

export default storedUserApi;
