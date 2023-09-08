// utils 
var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var days2=["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"];
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const da=new Date();

// elements
  const div=document.getElementById("icon");
  const date=document.getElementById("date");
  const daa=document.getElementById("year");
  const temp=document.getElementById("temp");
  const type=document.getElementById("type");
  const locat=document.getElementById("locat");
  const button=document.getElementById("submit");
  const input=document.getElementById("city-name");
  const subdays=document.querySelectorAll(".days>div");
  const prec=document.getElementById("prec");
  const humid=document.getElementById("humid");
  const wind=document.getElementById("wind");
  const nameblock=document.getElementById("username");
  const favcity=document.getElementById("fav-city");
  const usercity=document.getElementById("usercity");
  const addfav=document.getElementById("add");

  let cityname="";
  input.addEventListener("change",(e)=>{
    cityname=e.target.value;
  });

  // api call from backend and handeling on click for cities
  button.addEventListener("click",(e)=>{
    e.preventDefault();
    if(input.style.display==="none"){
      input.style.display="flex";
      addfav.style.display="flex";
    }else{
      input.style.display="none";
      addfav.style.display="none";
    }

    if(cityname.length>=0){
    // requesting data for the respective city
    axios.post("https://weather-7tsc.onrender.com/",{name:cityname}).then((data)=>{
    card1(data.data.current,data.data.location);
    card2(data.data.forecast.forecastday,data.data.current);
    }).catch((err)=>{
    console.log(err);
    });
    }else{
      alert("please enter ");
    }
  });


  // updating card 1 data
  const card1=(current,loc)=>{
    div.style.backgroundImage=`url(${current.condition.icon})`;
    temp.textContent=`${current.temp_c}°C`
    type.textContent=`${current.condition.text}`;
    locat.textContent=` ${loc.name} ${loc.region}`
  };


  // updating card2 data
  const card2=(arr2,curr)=>{
  let k=1;
  prec.textContent=`${curr.precip_mm}%`
  humid.textContent=`${curr.humidity}%`
  wind.textContent=`${curr.wind_kph}km/h`
    subdays.forEach(element => {
      const arr=element.children;
      console.log(arr);
      const imgElement = element.querySelector('img');
      const helement=element.querySelector('.temp-sub');
      helement.textContent=`${arr2[k].day.avgtemp_c}°C`
      imgElement.setAttribute('src', arr2[k].day.condition.icon);
      k++;
    });
  }


  // updating days info
  let k=1;
  subdays.forEach(element => {
    const arr=element.children;
    const dayelement=element.querySelector('.day-par');
    dayelement.textContent=`${days[(da.getDay()+k)%7]}`
    k++;
  });




  // adding fav cities
   addfav.addEventListener('click',()=>{
      if(cityname.length!==0){
        const data={
          username:user.username,
          city:cityname.toLowerCase()
        }
        axios.post("https://weather-7tsc.onrender.com/addfav",data).then(res=>{
          console.log(res.data);
        });
        const option=document.createElement("option");
     option.text=cityname;
     usercity.appendChild(option);
      }
   })

  // Demo data
  let data={
    last_updated_epoch: 1694079000,
    last_updated: '2023-09-07 10:30',
    temp_c: 25,
    temp_f: 77,
    is_day: 1,
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      code: 1000
    },
    wind_mph: 8.1,
    wind_kph: 13,
    wind_degree: 80,
    wind_dir: 'E',
    pressure_mb: 1017,
    pressure_in: 30.03,
    precip_mm: 0,
    precip_in: 0,
    humidity: 65,
    cloud: 0,
    feelslike_c: 25.8,
    feelslike_f: 78.4,
    vis_km: 10,
    vis_miles: 6,
    uv: 7,
    gust_mph: 6.5,
    gust_kph: 10.4
  }
  
  div.style.height="40px";
  div.style.width="40px";
  div.style.marginLeft="20px"
  div.style.color="white"
  div.style.backgroundImage = `url(${data.condition.icon})`;
  
  date.textContent=`${days2[da.getDay()]}`;
  daa.textContent=`${da.getDate()} ${months[da.getMonth()]} ${da.getFullYear()}`
   temp.textContent=`${data.temp_c} °C`
   type.textContent=`${data.condition.text}`;

   const logout=document.getElementById("logout");

console.log(localStorage.getItem('islogin'));
console.log( JSON.parse(localStorage.getItem("user")));
let login=localStorage.getItem('islogin');
const user=JSON.parse(localStorage.getItem("user"));
logout.addEventListener('click',()=>{
 localStorage.setItem('islogin',false);
 login=localStorage.getItem('islogin');
  nameblock.textContent="Signin/Signup";
  logout.textContent="";
  favcity.textContent="";
  console.log(login);
  nameblock.addEventListener('click',()=>{
    window.location.href="./Auth/signin.html"
  });
});


const addcity=(arr)=>{
  arr.forEach(element=>{
     const option=document.createElement("option");
     option.text=element;
     usercity.appendChild(option);
  });
};

logout.style.width="fit-content";
if(login){
     nameblock.textContent=user.username;
     logout.textContent="logout";
     logout.style.marginTop='1px'
     addcity(user.cities);
     axios.post("https://weather-7tsc.onrender.com/addfav",data).then(res=>{
      console.log(res.data);
      addcity(res.data);
    });
}else{
  nameblock.textContent="Signin/Signup";
  console.log("logout");
  nameblock.addEventListener('click',()=>{
    window.location.replace="./Auth/signin.html"
  });
}
 
// const arr=["delhi","mumbai","chennai"];

const favclick=document.getElementById("usercity");
console.log(favclick);
  
usercity.addEventListener('change',(e)=>{
  console.log(e.target.value);
  axios.post("https://weather-7tsc.onrender.com/",{name:e.target.value}).then((data)=>{
    card1(data.data.current,data.data.location);
    card2(data.data.forecast.forecastday,data.data.current);
    }).catch((err)=>{
    console.log(err);
    });
})