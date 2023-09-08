import  express from "express";
import cors from "cors"
import axios from "axios";
import router from "./routes.js";
import connect from "./db/connection.js";


const app=express();
connect();



app.use(cors());
app.use(express.json());


app.use("/",router)
app.listen(8000,()=>{
    console.log("at 8000");
});



// app.post("/",async(req,res)=>{
// 	console.log(req.body);
//   try {
// 	const response = await axios.request(`http://api.weatherapi.com/v1/forecast.json?key=acdf0bd9593b423d99075737230709&q=${req.body.name}&days=5&aqi=no&alerts=no`);
// 	res.send(response.data);
// } catch (error) {
// 	console.error(error);
// }
// });
