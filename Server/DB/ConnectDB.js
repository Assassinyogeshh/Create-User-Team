import mongoose from "mongoose";


const connectMongo = async (url) => {
    try {

        if (!url) {
            throw new Error("DataBase error" + error);
        }
        await mongoose.connect(url)
        console.log("Successfully Connected to the Database");
    } catch (error) {
        console.log(`mongo error: ${error}`);
    }
}

export default connectMongo;