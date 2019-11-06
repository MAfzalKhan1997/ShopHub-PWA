
var storageRef = firebase.storage().ref('images');

var i = document.getElementById("adtitle");
var j = document.getElementById("addescript");
var k = document.getElementById("adimage");
var l = document.getElementById("adprice");
var m = document.getElementById("adlocation");
var n = document.getElementById("adnumber");
var o = document.getElementById("categories");


k.addEventListener("change", (e) => {
    //   get a file
    file = e.target.files[0];
    console.log(file.name);
});


function submitAd() {
    if ((i.value && j.value && k.value && l.value && m.value && n.value && o.value) === "") {

        document.getElementById('errorad').style.display = "block";
        document.getElementById('errorad').innerText = "! " + "Please fill all the fields.";

        i.value = "";
        // k.value = "";
        l.value = "";
        m.value = "";
        n.value = "";
    }

    else {
        document.getElementById('submitAdbtn').disabled =  true ; 
        document.getElementById('spin').style.display = "inline-block";
        document.getElementById('errorad').style.display = "none";

        // Upload file and metadata to the object 'images/mountains.jpg'
        // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        var uploadTask = storageRef.child('postAds/' + file.name).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'

            function (snapshot) {

                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;

                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object");
                        break;

                    case 'storage/canceled':
                        console.log("User canceled the upload");
                        break;

                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL 
                var user = firebase.auth().currentUser;

                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    // console.log('File available at', downloadURL);

                    var adobj = {
                        name: user.displayName,
                        adtitle: i.value,
                        addescript: j.value,
                        downloadURL: downloadURL,
                        adprice: l.value,
                        adnumber: n.value,
                        adlocation: m.value,
                        category: o.value,
                        uid: user.uid,
                        email: user.email
                        

                    };

                    firebase.database().ref("/").child(`adsAll/`).push(adobj)
                        .then((adobj) => {
                            // alert();
                            var adObjKey = adobj.key;
                            console.log(adObjKey)
                            addingAdd(adObjKey);
                        });

                    function addingAdd(adObjKey) {
                        // alert("add horha ha");
                        firebase.database().ref("/").child(`adsposts/${o.value}/${adObjKey}`).set(adobj)
                        firebase.database().ref("/").child(`myAds/${user.uid}/${adObjKey}`).set(adobj)
                            .then(() => {

                                document.getElementById('spin').style.display = "none";
                                document.getElementById('submitAdbtn').disabled =  false ; 

                                i.value = "";
                                j.value = "";
                                k.value = "";
                                l.value = "";
                                m.value = "";
                                n.value = "";

                                $('#ModalPostAd').modal('hide');

                                swal({
                                    title: "Success!",
                                    text: "Your AD is live now.",
                                    icon: "success",
                                });

                                console.log("AD added to DataBase.");
 
                            })
                    }
                    // console.log(adobj);
                }).catch((error) => {

                    i.value = "";
                    j.value = "";
                    k.value = "";
                    l.value = "";
                    m.value = "";
                    n.value = "";
                    
                    document.getElementById('errorad').style.display = "block";
                    document.getElementById('errorad').innerText = error.message;
                    document.getElementById('spin').style.display = "none";
                    document.getElementById('submitAdbtn').disabled =  false ; 

                    console.log(error.message);
                    
 
                });


            }
        );

    }
}