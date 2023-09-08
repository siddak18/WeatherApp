import mongoose from "mongoose";


const connect=()=>{
    const url="mongodb+srv://siddakrajpal14:CGOPjHjIV7vI4PE5@cluster0.a05dq5k.mongodb.net/?retryWrites=true&w=majority";
       mongoose.connect(url,{useNewUrlParser:true});
           mongoose.connection.on('connected',()=>{
            console.log("connected");
        });
        mongoose.connection.on('disconnected',()=>{
            console.log("disconnected");
        });
        mongoose.connection.on('error',()=>{
            console.log("error");
        });
}



export default connect