
var myEmail = document.getElementById("email");
var myPassword = document.getElementById("password");
var button = document.getElementById("button");


const handleSubmit = async (e) => {
 

}

var myUsername = document.getElementById("username");
var myEmail = document.getElementById("email");
var myPassword = document.getElementById("password");
var button = document.getElementById("button");

button.addEventListener('click', () => {
  if(myPassword.value == "" || myEmail.value == "" || myUsername == ""){
    alert('You Need To Complete All the Fields')
    return false;
  }


  var userdetails = {
    username: myUsername.value,
    email: myEmail.value,
    password: myPassword.value
  }
try {
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(userdetails)
  })
  Swal.fire({
    title: "Congratulations!",
    text: "You Have Successfully Registered!",
    icon: "success"
  });

  setTimeout(() => {
    window.location.href = "http://localhost:3000/loginc.html";
}, 3000)


 
} catch (error) {
  console.log(error.message)
}

})
 
