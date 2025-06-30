import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique: true,
        required : true
    
    },
    name : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    phone : {
        type : String,
        required : true,
        default : "Not given"
    },
    password : {
        type : String,
        required : true,
        default : "123"
    }
})
const UserModel = new mongoose.model("UserModel",userSchema)
export default UserModel;