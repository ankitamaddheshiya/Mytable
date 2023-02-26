var modal = document.getElementById('id01');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
const onLogin=()=>{
  const payload = {
     //name:document.getElementById("name").value,
      email:document.getElementById("email").value,
      pass:document.getElementById("pass").value
  }
  fetch("http://localhost:8060/users/login",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },

      body:JSON.stringify(payload)
  }).then(res=>res.json())
  .then(res=>{
      console.log(res)
      localStorage.setItem("token",res.token)
      
  })
  .catch(err=>console.log(err))
  
}


