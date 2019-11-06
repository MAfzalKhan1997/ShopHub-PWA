



//   var auth = firebase.auth(); 
//   var database = firebase.database().ref("/");


function signup() {


    var a = document.getElementById("userName2");
    var b = document.getElementById("userEmail2");
    var c = document.getElementById("userPass2");
    var d = document.getElementById("userNumber2");
    // console.log(a);
    if ((a.value || b.value || c.value || d.value) === "") {

        var e = document.getElementById("userName");
        var f = document.getElementById("userEmail");
        var g = document.getElementById("userPass");
        var h = document.getElementById("userNumber");

        var userName = e.value;
        var userEmail = f.value;
        var userPass = g.value;
        var userNumber = h.value;
    }

    else {

        userName = a.value;
        userEmail = b.value;
        userPass = c.value;
        userNumber = d.value;

    }


    if ((userName && userEmail && userPass && userNumber) === "") {
        swal({
            title: "Alert!",
            text: "Please fill all the fields",
            icon: "warning",
        });

        b.value = "";
        c.value = "";
        d.value = "";
        f.value = "";
        g.value = "";
        h.value = "";

    }

    else {
        document.getElementById('signupbtn').disabled = true;
        document.getElementById('createbtn').disabled = true;
        document.getElementById('spin1').style.display = "inline-block";
        document.getElementById('spin2').style.display = "inline-block";
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
            .then((data) => {

                document.getElementById('signupbtn').disabled = false;
                document.getElementById('createbtn').disabled = false;
                document.getElementById('spin1').style.display = "none";
                document.getElementById('spin2').style.display = "none";

                $('#myModal').modal('hide');
                
                swal({
                    title: "Done!",
                    text: "You are Successfully Sign Up",
                    icon: "success",
                });
 
                // a.value = "";
                // b.value = "";
                // c.value = "";
                // d.value = "";
                // e.value = "";
                // f.value = "";
                // g.value = "";
                // h.value = "";




                var user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: userName,
                    photoURL: "",
                    // phoneNumber: userNumber,
                    // emailVerified: emailVerified,
                })
                    .then(function () {
                        console.log("Profile Updated.");
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });

                addUserToDatabase(userName, userEmail, userPass, userNumber);

            })
            .catch((error) => {
                document.getElementById('signupbtn').disabled = false;
                document.getElementById('createbtn').disabled = false;
                document.getElementById('spin1').style.display = "none";
                document.getElementById('spin2').style.display = "none";
                // Handle Errors here.
                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "warning",
                });
                // ... 

                b.value = "";
                c.value = "";
                d.value = "";
                f.value = "";
                g.value = "";
                h.value = "";
            });


            
        function addUserToDatabase(userName, userEmail, userPass, userNumber) {
            var userObject = {
                Name: userName,
                email: userEmail,
                pass: userPass,
                number: userNumber
            };
            var user = firebase.auth().currentUser;
            firebase.database().ref("/").child("users/" + user.uid).set(userObject)
                .then(() => {

                    console.log("User added to DataBase.");

                a.value = "";
                b.value = "";
                c.value = "";
                d.value = "";
                e.value = "";
                f.value = "";
                g.value = "";
                h.value = "";

                    // setTimeout(() => {

                    //     location.href = "ads.html";

                    // }, 3000);

                })
        }

    }

}