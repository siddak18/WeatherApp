import { model } from "mongoose";
import usercollection from "./db/model.js";




 export const weatherinfo=async(req,res)=>{
	console.log(req.body);
  try {
	const response = await axios.request(`http://api.weatherapi.com/v1/forecast.json?key=acdf0bd9593b423d99075737230709&q=${req.body.name}&days=5&aqi=no&alerts=no`);
	res.send(response.data);
} catch (error) {
	console.error(error);
}
};

export const signup=async(req,res)=>{
    console.log(req.body);
    const userdup=await usercollection.findOne({name:req.body.name});
     if(!userdup){
    try {
        const user=await usercollection.create({
            name:req.body.name,
            password:req.body.password
        });
        await user.save();
        res.send("saved");
    } catch (error) {
         console.log(error);
       }
    }
    else{
       res.send("already");
    }
};

export const signin=async(req,res)=>{
        try {
        const user=await usercollection.findOne({name:req.body.name});
        if(!user){
            res.send("notfound");
        }else{
           if(req.body.password===user.password){
            res.json(user);
           }else{
            res.send("wrongpass");
           }
        }
        } catch (error) {
            console.log(error);
        }
}


export const addfav=async(req,res)=>{
    try {
        const user=await usercollection.findOne({name:req.body.username});
        const arr=user.favcity;
        if (!arr.includes(req.body.city)){
        arr.push(req.body.city);
    }
        const updatedUser = await usercollection.updateOne(
            { name: req.body.username }, // Filter by the user's name
            { $set: { favcity: arr } } // Update the favcity array
          );
          res.send(arr);
    } catch (error) {
        
    }
    console.log(req.body);
}

