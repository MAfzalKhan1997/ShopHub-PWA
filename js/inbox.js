// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMH8j9q2luinH5P-BKd5gHU3sX5zpILTY",
    authDomain: "shophub-mak.firebaseapp.com",
    databaseURL: "https://shophub-mak.firebaseio.com",
    projectId: "shophub-mak",
    storageBucket: "shophub-mak.appspot.com",
    messagingSenderId: "1000638393490"
  };
  firebase.initializeApp(config); 

   

//   var storage = firebase.storage();
    // var user = firebase.auth().currentUser;
    
    firebase.auth().onAuthStateChanged(function(user) {
        
    if (user) {
      
      // document.getElementById("navpostad").style.display = "inline-block";
      // document.getElementById("navsignout").style.display = "inline-block";
      // document.getElementById("navfavourite").style.display = "inline-block";  
      // document.getElementById("navsignin").style.display = "none";
      // document.getElementById("navsignup").style.display = "none";
      console.log("User is Sign in.");
      clients();
      function clients(){ 
      
          // let CurrUser = localStorage.getItem('ADUid');
          var currUser = firebase.auth().currentUser; 
          console.log(currUser.uid);
          firebase.database().ref(`/ChatArea/${currUser.uid}/`).on('child_added', function (data){
    
            document.getElementById("loading").style.display="none";
            document.getElementById("myChatOpt").style.visibility="visible";
    
              console.log(data.key);
              let chatUser = data.key;
              console.log(data.val());
              let clients = data.val();
      
              let clientsDiv = document.getElementById("clientsDiv");
      
              let container = document.createElement('DIV'); 
              container.setAttribute("class" , "container"); 
              clientsDiv.appendChild(container);

              let clientDp = document.createElement('IMG');
              clientDp.setAttribute("src" , "./images/avatar.png")            
              clientDp.setAttribute("width" , "30"); 
              clientDp.setAttribute("height" , "30");
              // clientDp.innerHTML = `<i class = "far fa-comments fa-sm"></i>`; 
              clientDp.style.cssFloat = "left";
              container.appendChild(clientDp);
      
              let clientName = document.createElement('H5');
              clientName.innerHTML = clients.name; 
              clientName.style.cssFloat = "left";
              container.appendChild(clientName);
    
              let clientChat = document.createElement('BUTTON');
              clientChat.setAttribute("type" , "button")            
              clientChat.setAttribute("class" , "btn btn-outline-success"); 
              clientChat.innerHTML = `<i class = "far fa-comments fa-sm"></i>`; 
              clientChat.style.cssFloat = "right";
              container.appendChild(clientChat);
    
              clientChat.addEventListener("click", (e) => {
                // console.log(chatUser);
                localStorage.setItem('chatUser', chatUser);
                localStorage.setItem('name', clients.name);
                location.href = "chat.html";
              })
      
          })
      }
             
    } else {
       console.log("No user is signed in."); 
      alert("Please Sign-In First.");
        location.href = "index.html";
      //  document.getElementById("navpostad").style.display = "none";
      //  document.getElementById("navfavourite").style.display = "none";  
      //  document.getElementById("navsignout").style.display = "none"; 
      //  document.getElementById("navsignin").style.display = "inline-block";
      //  document.getElementById("navsignup").style.display = "inline-block";
        
    }
  });

  // function signout(){

  //   firebase.auth().signOut()
  //   .then(function() { 

  //     swal({
  //       title: "Success!",
  //       text: "Sign Out Successfull",
  //       icon: "success",
  //   });
       
  //     console.log("You are Sign Out");
     
  //     }).catch(function(error) {
         
  //       console.log("Error,"+ error);

  //     });
    
  //   }





function searchClients(){

  document.getElementById("clback").style.display="none";
  document.getElementById("clhome").style.display="none";
  document.getElementById("clads").style.display="none";
  document.getElementById("clsearch").style.display="none";
  document.getElementById("clsearch2").style.display="inline-block"; 
  document.getElementById("clsearchbox").style.display="inline-block"; 
  document.getElementById("clclose").style.display="inline-block"; 

}    

function searchReturn(){
   
  document.getElementById("clsearch2").style.display="none"; 
  document.getElementById("clsearchbox").style.display="none"; 
  document.getElementById("clclose").style.display="none";  
  document.getElementById("clback").style.display="inline-block";
  document.getElementById("clhome").style.display="inline-block";
  document.getElementById("clads").style.display="inline-block"; 
  document.getElementById("clsearch").style.display="inline-block";
  document.getElementById("searchbar").value = "";
}


$(document).ready(function(){
  $("#searchbar").on("keyup", function() {
      var search = document.getElementById('searchbar');
      var filter = search.value.toLocaleUpperCase();
      var container = document.getElementsByClassName('container'); 
  
      for (i = 0; i < container.length; i++) {
          var h5 = container[i].getElementsByTagName('H5')[0];
          if (h5.innerHTML.toLocaleUpperCase().indexOf(filter) > -1) { 
              container[i].style.display = 'block'; 
          }
          else { 
              container[i].style.display = 'none'; 
          }
      }
  });
  }); 