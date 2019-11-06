
/* REQUESTING-PUSH-NOTIFICATION */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../serviceworker.js').then(function (registration) {

            // Registration was successful
            firebase.messaging().useServiceWorker(registration);

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {

                    function saveMessagingDeviceToken() {

                        firebase.messaging().getToken().then(function (currentToken) {
                            if (currentToken) {
                                console.log('Got FCM device token:', currentToken);
                                // Saving the Device Token to the datastore.
                                firebase.database().ref('/fcmTokens').child(currentToken)
                                    .set(firebase.auth().currentUser.uid);
                            } else {
                                // Need to request permissions to show notifications.
                                requestforpermision()
                            }
                        }).catch(function (error) {
                            console.error('Unable to get messaging token.', error);
                        });
                    }//Savetoken ends here

                    function requestforpermision() {
                        firebase.messaging().requestPermission().then(function () {
                            // Notification permission granted.
                            saveMessagingDeviceToken();
                        }).catch(function (error) {
                            console.error('Unable to get permission to notify.', error);
                            alert("Your Notifications Are Disabled")
                        });

                    }//Req Permisison ends here
                    requestforpermision()
                }
            });
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

firebase.messaging().onMessage(function (payload) {
    console.log("This is Payload" + payload)
});

/* REQUESTING-PUSH-NOTIFICATION  END */



firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("loading").style.display = "none";
    if (user) {
        console.log("User is Sign in.");

        document.getElementById("createbtn").disabled = true;
        document.getElementById("introsignin").style.display = "none";
        document.getElementById("introsignup").style.display = "none";
        document.getElementById("navsignout").style.display = "inline-block";
        document.getElementById("navsignin").style.display = "none";
        document.getElementById("navsignup").style.display = "none";



    } else {
        console.log("No user is signed in.");
        document.getElementById("navsignout").style.display = "none";
        document.getElementById("navsignin").style.display = "inline-block";
        document.getElementById("navsignup").style.display = "inline-block";
        document.getElementById("introsignin").style.display = "inline-block";
        document.getElementById("introsignup").style.display = "inline-block";
        document.getElementById("createbtn").disabled = false;

    }
});

function signout() {

    firebase.auth().signOut()
        .then(function () {
            swal({
                title: "Success!",
                text: "Sign Out Successfull",
                icon: "success",
            });

            console.log("You are Sign Out");

        }).catch(function (error) {

            console.log("Error," + error);

        });

}

function modalsignin() {


    document.getElementById("modalaccount").style.display = "none";
    document.getElementById("modallogin").style.display = "block";


}

function modalsignup() {


    document.getElementById("modallogin").style.display = "none";
    document.getElementById("modalaccount").style.display = "block";
    // document.getElementById("modalaccount").style.transition = "1s";

}

//   $(document).ready(function(){
//     $("#btnmodalsignin").click(function(){
//         $("#myModal").modal();
//     });
// });
