// Initialize Firebase
//  var config = {
//     apiKey: "AIzaSyDMH8j9q2luinH5P-BKd5gHU3sX5zpILTY",
//     authDomain: "shophub-mak.firebaseapp.com",
//     databaseURL: "https://shophub-mak.firebaseio.com",
//     projectId: "shophub-mak",
//     storageBucket: "",
//     messagingSenderId: "1000638393490"
//   };
//   firebase.initializeApp(config); 
 

  
  function signin()
{
    var i =document.getElementById("email");
    var j =document.getElementById("pass");

	var email = i.value;
    var pass = j.value;
    
    if( (email && pass) === "")
    { 
        document.getElementById('error').innerText ="! " + "Please fill all the fields.";
   
            i.value = "";
            j.value = "";
    }

else{
    document.getElementById("signinbtn").disabled = true;
    document.getElementById('spin3').style.display = "inline-block"; 

	firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => { 
        document.getElementById('spin3').style.display = "none";
        document.getElementById("signinbtn").disabled = false;
        document.getElementById('error').style.display = "none";

        swal({
            title: "Success!",
            text: "Log In Successfull.",
            icon: "success",
        });
        
        i.value = "";
        j.value = "";

        $('#myModal').modal('hide');
        
        // setTimeout(() => {

        //     location.href = "ads.html";
             
        // }, 3000);
       
    }) 
		.catch(function(error){
            document.getElementById('spin3').style.display = "none";
            document.getElementById("signinbtn").disabled = false;
            document.getElementById('error').style.display = "block";
            document.getElementById('error').innerText ="! " + error.message;
            i.value = "";
            j.value = "";
		})
}  

}