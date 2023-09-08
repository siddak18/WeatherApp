import mongoose from "mongoose";


const userschma=mongoose.Schema({
    name:{
    type:String,
    minlength:1,
    required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    favcity:[]
});

const usercollection=mongoose.model("WeatherUser",userschma);


export default usercollection;