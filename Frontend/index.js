// utils 
var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var days2=["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"];
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const da=new Date();
console.log(da.getDay());
console.log(days[5]);
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

  let cityname="";
  input.addEventListener("change",(e)=>{
    cityname=e.target.value;
  });

  // api call from backend and handeling on click for cities
  button.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(e.target);
    if(input.style.display==="none"){
      input.style.display="flex";
    }else{
      input.style.display="none";
    }

    if(cityname.length>=0){
    // requesting data for the respective city
    axios.post("https://weather-7tsc.onrender.com/",{name:cityname}).then((data)=>{
    console.log(data.data);
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
    console.log(current);
    div.style.backgroundImage=`url(${current.condition.icon})`;
    temp.textContent=`${current.temp_c}°C`
    type.textContent=`${current.condition.text}`;
    locat.textContent=` ${loc.name} ${loc.region}`
    console.log(loc);
  };


  // updating card2 data
  const card2=(arr2,curr)=>{
  let k=1;
  console.log(arr2);
  console.log(subdays);
  console.log(curr);
  prec.textContent=`${curr.precip_mm}%`
  humid.textContent=`${curr.humidity}%`
  wind.textContent=`${curr.wind_kph}km/h`
    subdays.forEach(element => {
      const arr=element.children;
      console.log(arr);
      const imgElement = element.querySelector('img');
      const helement=element.querySelector('.temp-sub');
      console.log(helement);
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
  console.log(`url(${data.condition.icon})`);
  console.log(da);
  date.textContent=`${days2[da.getDay()]}`;
  daa.textContent=`${da.getDate()} ${months[da.getMonth()]} ${da.getFullYear()}`
   temp.textContent=`${data.temp_c} deg C`
   type.textContent=`${data.condition.text}`;






