const toggle=document.querySelectorAll(".login>h2");
const submit=document.getElementById("signup");
const check=document.getElementById("check");
const check2=document.getElementById("check2");
const form=document.getElementById("form");
const username=document.getElementById("username");
const password=document.getElementById("password");
let page=1;
let islogintrue=false;
console.log(submit);


let nameof="";
let userpassword="";
let confirmpass="";



const handeltog=()=>{
    if(page===0){
        page=1;
    }else{
        page=0;
    }
    console.log(toggle);
toggle.forEach(element => {
    if(element.className==="active"){
        element.classList.remove("active");
        element.classList.add("nonactive");
        check.style.display="none";
        check2.style.display="none";
        submit.textContent="sign in";
    }else{
        element.classList.add("active");
        element.classList.remove("nonactive");
        check.style.display="flex";
        check2.style.display="flex";
        submit.textContent="sign up";
    }
});
}





username.addEventListener("change",(e)=>{
     nameof=e.target.value;
});
password.addEventListener("change",(e)=>{
      userpassword=e.target.value;
});
check.addEventListener("change",(e)=>{
      confirmpass=e.target.value;
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(page);
    const user={
        name:nameof,password:userpassword
    }
    if(page===0){
    console.log(confirmpass,nameof,userpassword);
    
    axios.post("https://weather-7tsc.onrender.com/signup",user).then(res=>{
        console.log(res.data);
        if(res.data==="already"){
            alert("user exists");
        }else{
            alert("resgisterd");
        }
}).catch(err=>{
    console.log(err);
})
    }
    else{
        axios.post("https://weather-7tsc.onrender.com/signin",user).then(res=>{
            console.log(res.data);
            if(res.data!=="notfound"&&res.data!=="wrongpass"){
                localStorage.setItem("islogin",true);
                const userinfo={
                    username:res.data.name,
                    cities:res.data.favcity
                }
                console.log(userinfo);
                localStorage.setItem("user",JSON.stringify(userinfo))
                window.location.href="../index.html"
                
            }else if(res.data==="notfound"){
                alert("not found");
            }else{
                alert("wrong password");
            }
        }).catch(err=>{
            console.log(err);
        });
   }
});


