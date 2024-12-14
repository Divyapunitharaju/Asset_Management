const form=document.getElementById('loginForm')
const BtnSubmit=document.getElementById('BtnSubmit')

form.addEventListener('submit',async (e)=>{
e.preventDefault()

const email=document.getElementById('email').value
const password=document.getElementById('password').value

if(!email || !password){
    alert("All fields are required")
}
const loginData={email,password}
try{
    const response= await fetch('http://localhost:3000/user/login',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body : JSON.stringify(loginData)
    }) 
if(response.ok){
    const result=await response.json()
    console.log(result)
    document.getElementById.innerHtml=`${result.message}`
    window.location.href = '/user/dashboard'
    form.reset()
}
else{
    const error=await response.json()

    document.getElementById.innerHtml=`${error.message}`
}

}

catch(error){
    console.log(error)
    alert("An unexpected error occurred . Please try again")
}

})
