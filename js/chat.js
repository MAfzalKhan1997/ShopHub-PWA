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

firebase.auth().onAuthStateChanged(function (user) {
  // document.getElementById("loading").style.display="none";
  if (user) {

    document.getElementById("loading").style.display = "none";
    document.getElementById("myChatOpt").style.visibility = "visible";
    // document.getElementById("navpostad").style.display = "inline-block";
    // document.getElementById("navsignout").style.display = "inline-block";
    // document.getElementById("navfavourite").style.display = "inline-block";  
    // document.getElementById("navsignin").style.display = "none";
    // document.getElementById("navsignup").style.display = "none";
    console.log("User is Sign in.");

    // function delChatting(){

    //   firebase.database().ref(`/ChatArea/${user.uid}/${chatUser}/Chatting/`).remove();

    // }


    chatting();
    function chatting() {

      //   let ADUid = localStorage.getItem('ADUid');
      let name = localStorage.getItem('name');
      let chatUser = localStorage.getItem('chatUser');

      document.getElementById("myClientName").innerHTML = name;
      firebase.database().ref(`/ChatArea/${user.uid}/${chatUser}/Chatting/`).on('child_added', function (data) {
        // console.log(data);
        // document.getElementById("loading").style.display="none";
        // document.getElementById("myChatOpt").style.visibility="visible";

        // console.log(data.val());

        let messages = data.val().msg;

        let msgDiv = document.getElementById("msgDiv");
        // msgDiv.innerHTML = "";

        let container = document.createElement('DIV');
        container.setAttribute("class", "msgContainer");
        if (user.uid === data.val().senderUid) {
          // container.style.cssFloat = "right";
          container.className += " me";
        }
        else {
          // container.style.cssFloat = "left";
          container.className += " him";
        }
        msgDiv.appendChild(container);

        let msg = document.createElement('P');
        msg.innerHTML = messages;
        container.appendChild(msg);
        //   scrollbottom();
        pageScroll();
        //  autoScroll();   
      });

      function pageScroll() { 

        window.scrollBy(0, 99999999999);

        // scrolldelay = setTimeout('pageScroll()',200); //Increase this # to slow down, decrease to speed up scrolling
 
      }




      //       var x = 1; //y-axis pixel displacement
      // var y = 1; //delay in milliseconds

      // setInterval(function() {
      //     window.scroll(0, x);
      //     x = x + 2; //if you want to increase speed simply increase increment interval
      // }, y);  

      //   let msgDiv = document.getElementById("msgDiv");
      //   function scrollbottom(){
      //     var isScrolled = msgDiv.scrollTop == msgDiv.scrollHeight - msgDiv.offsetHeight;

      //     setTimeout(function(){msgDiv.scrollTop = msgDiv.scrollHeight;},100)
      // }


      let msg = document.getElementById('msg');
      let sendmsg = document.getElementById('sendmsg');

      msg.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          if (msg.value !== "") {
            sendingMsg();
          }
        }
      });

      sendmsg.addEventListener("click", (e) => {
        if (msg.value !== "") {
          sendingMsg();
        }
      });

      function sendingMsg() {

        let msgs = msg.value;

        let msgObj = {
          name: user.displayName,
          senderUid: user.uid,
          recieverUid: chatUser,//Here we are giving reciever id so that we can send notifcations to all the tokens registered with this user's id
          msg: msgs
        }

        msg.value = "";

        firebase.database().ref('Messages').push(msgObj);

        firebase.database().ref(`/ChatArea/${user.uid}/${chatUser}/Chatting`).push(msgObj)
        firebase.database().ref(`/ChatArea/${chatUser}/${user.uid}/Chatting`).push(msgObj)
          .then((data) => {

            // sending push notification

            firebase.database().ref("fcmTokens").once("value", function (snapshot) {
              // alert();
              //   console.log(snapshot);
              snapshot.forEach(function (token) {
                if (token.val() === chatUser) { //Getting the token of the reciever using  if condition..!   
                  console.log(token.key)
                  $.ajax({
                    type: 'POST', url: "https://fcm.googleapis.com/fcm/send",
                    headers: { Authorization: 'key=' + 'AIzaSyCL2Im7AvEGnJZibJRSkfM1CeMI1sK5U3Q' },
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                      "to": token.key, "notification": {
                        "title": `Message From ${user.displayName}`,
                        "body": msgs.slice(0,80) + "...",
                        "icon": `../images/noti/msgNoti2.png`, //Photo of sender
                        "click_action": `https://shophub-mak.firebaseapp.com/chat.html`//Notification Click url notification par click honay k bad iss url par redirect hoga
                      }
                    }),
                    success: function (response) {
                      console.log(response);
                      //Functions to run when notification is succesfully sent to reciever
                    },
                    error: function (xhr, status, error) {
                      //Functions To Run When There was an error While Sending Notification
                      console.log(xhr.error);
                    }
                  });
                }
              });


            });

          });
      }
      delConvo.addEventListener('click', (e) => {

        firebase.database().ref(`/ChatArea/${user.uid}/${chatUser}/Chatting/`).remove();
        msgDiv.innerHTML = "";

      });
    }


  }
  else {
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


      // Hide Header on on scroll down
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var navbarHeight = $('header').outerHeight();
      
      $(window).scroll(function(event){
        // alert();
          didScroll = true;
      });
      
      setInterval(function() {
          if (didScroll) {
              hasScrolled();
              didScroll = false;
          }
      }, 250);
      
      function hasScrolled() {
          var st = $(this).scrollTop();
          
          // Make sure they scroll more than delta
          if(Math.abs(lastScrollTop - st) <= delta)
              return;
          
          // If they scrolled down and are past the navbar, add class .nav-up.
          // This is necessary so you never see what is "behind" the navbar.
          if (st > lastScrollTop && st > navbarHeight){
              // Scroll Down
              $('header').removeClass('nav-down').addClass('nav-up');

          } else {
              // Scroll Up
              if(st + $(window).height() < $(document).height()) {
                  $('header').removeClass('nav-up').addClass('nav-down');
                  // document.getElementById("myChatOpt").style.marginTop = "50px";
              }
          }
          
          lastScrollTop = st;
      }


function searchClients() {

  document.getElementById("clback").style.display = "none";
  document.getElementById("clhome").style.display = "none";
  document.getElementById("clads").style.display = "none";
  document.getElementById("clsearch").style.display = "none";
  document.getElementById("clDelChat").style.display = "none";
  document.getElementById("clsearch2").style.display = "inline-block";
  document.getElementById("clsearchbox").style.display = "inline-block";
  document.getElementById("clclose").style.display = "inline-block";

}

function searchReturn() {

  document.getElementById("clsearch2").style.display = "none";
  document.getElementById("clsearchbox").style.display = "none";
  document.getElementById("clclose").style.display = "none";
  document.getElementById("clback").style.display = "inline-block";
  document.getElementById("clhome").style.display = "inline-block";
  document.getElementById("clads").style.display = "inline-block";
  document.getElementById("clsearch").style.display = "inline-block";
  document.getElementById("clDelChat").style.display = "inline-block";
  document.getElementById("searchbar").value = "";
}


$(document).ready(function () {
  $("#searchbar").on("keyup", function () {
    var search = document.getElementById('searchbar');
    var filter = search.value.toLocaleUpperCase();
    var msgContainer = document.getElementsByClassName('msgContainer');

    for (i = 0; i < msgContainer.length; i++) {
      var p = msgContainer[i].getElementsByTagName('P')[0];
      if (p.innerHTML.toLocaleUpperCase().indexOf(filter) > -1) {
        msgContainer[i].style.display = 'block';
      }
      else {
        msgContainer[i].style.display = 'none';
      }
    }
  });
}); 