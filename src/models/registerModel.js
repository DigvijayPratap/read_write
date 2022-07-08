const mongoose = require("mongoose");

const employeeSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    gender:{
        type:String
        
    },
    email:{
            type:String,
            required:true,
            unique:true
    },
    mobNumber:{
        type:Number
       
    },
    DOB:{
        type:Date
    },
    occupation:{
        type:"String",
        maxLength: 10
    },
    password:{
        type:"String",
        required:true
    }
    
});

/// now create collection
const Register=new mongoose.model("Register",employeeSchema);

module.exports= Register;