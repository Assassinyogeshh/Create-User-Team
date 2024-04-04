import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    C_password: {
        type: String,
        required: true
    }
});

const userAuth = mongoose.model("socialUser", UserSchema);

export default userAuth;