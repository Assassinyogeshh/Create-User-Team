import storedUserApi from "./Model/UserApiSchema.js";
import userApi from "./UserApi.json" assert { type: "json" };
import connectMongo from "./DB/ConnectDB.js";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

 const storeUserApiInDB= async()=>{
    try {


await connectMongo(process.env.DATABASE_URL);
 await storedUserApi.create(userApi);

 console.log("Api Successfully Stored");

console.log(userApi);

    } catch (error) {
        console.log(error);
    }
}


 storeUserApiInDB()