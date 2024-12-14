const form = document.getElementById('signupForm');
const BtnSubmit = document.getElementById('BtnSubmit');

form.addEventListener('submit', async (e) => {
e.preventDefault();
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
if (!name || !email || !password) {
alert("All fields are required");
    return;
}

const signupData = { name,email,password };
try {
    const response =await fetch('http://localhost:3000/user/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
})

if(response.ok) {
    const result = await response.json();
    console.log("Response Status:", response.status)
    console.log("Response OK:", response.ok)
    console.log(result)
    alert(result.message)
    form.reset();
} else{
    const error = await response.json();
    alert("Error: " + error.message);
    }
} catch(error) {
    console.log(error);
    alert("An unexpected error occurred. Please try again.");
}
})
