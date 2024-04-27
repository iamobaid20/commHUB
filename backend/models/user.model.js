import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type: String,
        default:"",
    },
},
	{ timestamps: true }
    
    );

const User = mongoose.model("User",userSchema);// always use singular name of collecion mongoose will automactically understand it will make it plural like if you want to store data of users than you should User and mongoose will understand and crate users, same for people.. you should write person and mongoose will create people

export default User; //we have created model on the upper line using model method and by providing our schema and here we are exporting it
