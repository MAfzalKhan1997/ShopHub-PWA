
//   var storage = firebase.storage();
// var user = firebase.auth().currentUser;




var checkInternet = function () {
    if (navigator.onLine) {

        console.log('status >>>   You are ONLINE')

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {

                document.getElementById("navpostad").style.display = "inline-block";
                console.log("User is Sign in.");
                console.log(user.uid);

                favourites();

                function favourites() {

                    document.getElementById("catname").innerHTML = "FAVOURITES";
                    let cardDeck = document.getElementById("cardDeck");
                    cardDeck.innerHTML = "";

                    let currentUser = firebase.auth().currentUser;

                    firebase.database().ref(`/favAds/${currentUser.uid}/`).once('value', function (data) {

                        localforage.setItem('favs', data.val()).then(() => {
                            console.log('Data has been saved in indexDB')
                        })

                        data.forEach(function (childData) {

                            document.getElementById("loading").style.display = "none";
                            // document.getElementById("navbar").style.visibility = "visible";
                            // console.log(childData.val());

                            let ad = childData.val();

                            // var cardMb3Hoverable = document.createElement("DIV");
                            // cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
                            // cardDeck.appendChild(cardMb3Hoverable);

                            // var viewOverlayZoom = document.createElement("DIV");
                            // viewOverlayZoom.setAttribute("class", "view overlay zoom");
                            // cardMb3Hoverable.appendChild(viewOverlayZoom);

                            let card = document.createElement("DIV");
                            card.setAttribute("class", "card");
                            cardDeck.appendChild(card);

                            let cardImage = document.createElement("IMG");
                            cardImage.setAttribute("class", "card-img-top");
                            cardImage.setAttribute("id", "adImg");
                            cardImage.setAttribute("src", ad.downloadURL);
                            card.appendChild(cardImage);

                            let cardBody = document.createElement("DIV");
                            cardBody.setAttribute("class", "card-body");
                            card.appendChild(cardBody);

                            let cardTitle = document.createElement("H4");
                            cardTitle.setAttribute("class", "card-title");
                            cardTitle.innerHTML = ad.adtitle;
                            cardBody.appendChild(cardTitle);

                            let cardText = document.createElement("P");
                            cardText.setAttribute("class", "card-text");
                            cardText.innerHTML = ad.addescript;
                            cardBody.appendChild(cardText);



                            let cardFooter1 = document.createElement("DIV");
                            cardFooter1.setAttribute("class", "card-Footer");
                            cardFooter1.setAttribute("id", "footer1");
                            card.appendChild(cardFooter1);

                            let cardFooter1Flex = document.createElement("DIV");
                            cardFooter1Flex.setAttribute("class", "flex-container");
                            cardFooter1.appendChild(cardFooter1Flex);

                            let cardPrice = document.createElement("DIV");
                            cardPrice.style.flexGrow = "9";
                            cardPrice.innerHTML = "Rs." + ad.adprice + "/-";
                            cardFooter1Flex.appendChild(cardPrice);



                            let cardFooter2 = document.createElement("DIV");
                            cardFooter2.setAttribute("class", "card-Footer");
                            cardFooter2.setAttribute("id", "footer2");
                            card.appendChild(cardFooter2);

                            let cardName = document.createElement("P");
                            cardName.innerHTML = `<i class="fa fa-user"></i> ${ad.name} `;
                            cardFooter2.appendChild(cardName);

                            let cardNumber = document.createElement("P");
                            cardNumber.innerHTML = `<i class="fas fa-phone fa-sm"></i> ${ad.adnumber} `;
                            cardFooter2.appendChild(cardNumber);

                            let cardLoc = document.createElement("P");
                            cardLoc.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${ad.adlocation} `;
                            cardFooter2.appendChild(cardLoc);



                            let cardFooter3 = document.createElement("DIV");
                            cardFooter3.setAttribute("class", "card-Footer");
                            cardFooter3.setAttribute("id", "footer3");
                            card.appendChild(cardFooter3);

                            let cardFooter3Flex = document.createElement("DIV");
                            cardFooter3Flex.setAttribute("class", "flex-container");
                            cardFooter3.appendChild(cardFooter3Flex);

                            let cardFav = document.createElement("DIV");
                            cardFav.setAttribute("class", "cardnoti");
                            cardFav.style.flexGrow = "1";
                            cardFav.innerHTML = `<i class = "fas fa-heart fa-xs"></i>`;
                            cardFooter3Flex.appendChild(cardFav);

                            let cardChat = document.createElement("DIV");
                            cardChat.setAttribute("class", "cardnoti");
                            cardChat.style.flexGrow = "1";
                            cardChat.innerHTML = `<i class = "far fa-comments fa-sm"></i>`;
                            cardFooter3Flex.appendChild(cardChat);

                            let cardReport = document.createElement("DIV");
                            cardReport.setAttribute("class", "cardnoti");
                            cardReport.style.flexGrow = "1";
                            cardReport.innerHTML = `<i class="far fa-flag fa-xs"></i>`;
                            cardFooter3Flex.appendChild(cardReport);

                            //   console.log(data.key);
                            let adKey = childData.key;

                            cardFav.addEventListener("click", (e) => {

                                cardFav.innerHTML = `<i class = "far fa-heart fa-xs"></i>`;

                                firebase.database().ref(`/favAds/${currentUser.uid}/`).child(adKey).remove();

                            });

                            cardChat.addEventListener("click", (e) => {

                                if (currentUser.uid === ad.uid) {
                                    swal({
                                        title: "Alert!",
                                        text: "Sorry,You Can't Chat with Yourself.",
                                        icon: "warning",
                                    });
                                }
                                else {
                                    cardChat.innerHTML = `<i class="fas fa-comments fa-sm"></i>`;
                                    let currUserDetails = {
                                        name: currentUser.displayName,
                                        // email : currentUser.email 
                                    };

                                    let ADUserDetails = {
                                        name: ad.name,
                                        // email : ad.email 
                                    };

                                    let msgObj = {
                                        name: currentUser.displayName,
                                        senderUid: currentUser.uid,
                                        receiverUid: ad.uid,
                                        msg: 'Assalam U Alaikum',
                                    };

                                    localStorage.setItem('chatUser', ad.uid);
                                    // localStorage.setItem('ADKey', adsKeys);
                                    // localStorage.setItem('CurrUser', currentUser.uid);
                                    localStorage.setItem('name', ad.name);


                                    firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/`).once('value', function (data) {

                                        console.log(data.val());
                                        let clientsObj = data.val();

                                        if (clientsObj === null) {

                                            firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/`).set(ADUserDetails)
                                            firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/Chatting`).push(msgObj)

                                            firebase.database().ref(`/ChatArea/${ad.uid}/${currentUser.uid}/`).set(currUserDetails)
                                            firebase.database().ref(`/ChatArea/${ad.uid}/${currentUser.uid}/Chatting`).push(msgObj)

                                                .then((data) => {

                                                    location.href = "chat.html";
                                                })
                                        }
                                        else {
                                            location.href = "chat.html";
                                        }
                                    });

                                }

                            });


                        })
                    })
                }



            }
            else {
                console.log("No user is signed in.");
                //    alert("Please Sign-In First.");
                location.href = "index.html";
            }
        });

    }
    else {

        console.log('status >>>   You are OFFLINE');
        offlineFavs();

        function offlineFavs() {

            document.getElementById("catname").innerHTML = "FAVOURITES";

            let cardDeck = document.getElementById("cardDeck");
            cardDeck.innerHTML = "";
            console.log('offline favs')
            localforage.getItem('favs').then(data => {

                document.getElementById("loading").style.display = "none";
                // document.getElementById("navbar").style.visibility = "visible";

                // console.log(data)
                var favArr = [];
                // data.forEach(function (childData) {
                for (var key in data) {

                    favArr.push(data[key])
                    console.log(data[key])
                }

                favArr.map((ad, i) => {
// alert();
                    // var cardMb3Hoverable = document.createElement("DIV");
                    // cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
                    // cardDeck.appendChild(cardMb3Hoverable);

                    // var viewOverlayZoom = document.createElement("DIV");
                    // viewOverlayZoom.setAttribute("class", "view overlay zoom");
                    // cardMb3Hoverable.appendChild(viewOverlayZoom);

                    let card = document.createElement("DIV");
                    card.setAttribute("class", "card");
                    cardDeck.appendChild(card);

                    let cardImage = document.createElement("IMG");
                    cardImage.setAttribute("class", "card-img-top");
                    cardImage.setAttribute("id", "adImg");
                    cardImage.setAttribute("src", ad.downloadURL);
                    card.appendChild(cardImage);

                    let cardBody = document.createElement("DIV");
                    cardBody.setAttribute("class", "card-body");
                    card.appendChild(cardBody);

                    let cardTitle = document.createElement("H4");
                    cardTitle.setAttribute("class", "card-title");
                    cardTitle.innerHTML = ad.adtitle;
                    cardBody.appendChild(cardTitle);

                    let cardText = document.createElement("P");
                    cardText.setAttribute("class", "card-text");
                    cardText.innerHTML = ad.addescript;
                    cardBody.appendChild(cardText);



                    let cardFooter1 = document.createElement("DIV");
                    cardFooter1.setAttribute("class", "card-Footer");
                    cardFooter1.setAttribute("id", "footer1");
                    card.appendChild(cardFooter1);

                    let cardFooter1Flex = document.createElement("DIV");
                    cardFooter1Flex.setAttribute("class", "flex-container");
                    cardFooter1.appendChild(cardFooter1Flex);

                    let cardPrice = document.createElement("DIV");
                    cardPrice.style.flexGrow = "9";
                    cardPrice.innerHTML = "Rs." + ad.adprice + "/-";
                    cardFooter1Flex.appendChild(cardPrice);



                    let cardFooter2 = document.createElement("DIV");
                    cardFooter2.setAttribute("class", "card-Footer");
                    cardFooter2.setAttribute("id", "footer2");
                    card.appendChild(cardFooter2);

                    let cardName = document.createElement("P");
                    cardName.innerHTML = `<i class="fa fa-user"></i> ${ad.name} `;
                    cardFooter2.appendChild(cardName);

                    let cardNumber = document.createElement("P");
                    cardNumber.innerHTML = `<i class="fas fa-phone fa-sm"></i> ${ad.adnumber} `;
                    cardFooter2.appendChild(cardNumber);

                    let cardLoc = document.createElement("P");
                    cardLoc.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${ad.adlocation} `;
                    cardFooter2.appendChild(cardLoc);



                    let cardFooter3 = document.createElement("DIV");
                    cardFooter3.setAttribute("class", "card-Footer");
                    cardFooter3.setAttribute("id", "footer3");
                    card.appendChild(cardFooter3);

                    let cardFooter3Flex = document.createElement("DIV");
                    cardFooter3Flex.setAttribute("class", "flex-container");
                    cardFooter3.appendChild(cardFooter3Flex);

                    let cardFav = document.createElement("DIV");
                    cardFav.setAttribute("class", "cardnoti");
                    cardFav.style.flexGrow = "1";
                    cardFav.innerHTML = `<i class = "fas fa-heart fa-xs"></i>`;
                    cardFooter3Flex.appendChild(cardFav);

                    let cardChat = document.createElement("DIV");
                    cardChat.setAttribute("class", "cardnoti");
                    cardChat.style.flexGrow = "1";
                    cardChat.innerHTML = `<i class = "far fa-comments fa-sm"></i>`;
                    cardFooter3Flex.appendChild(cardChat);

                    let cardReport = document.createElement("DIV");
                    cardReport.setAttribute("class", "cardnoti");
                    cardReport.style.flexGrow = "1";
                    cardReport.innerHTML = `<i class="far fa-flag fa-xs"></i>`;
                    cardFooter3Flex.appendChild(cardReport);

                    //   console.log(data.key);
                    // let adKey = childData.key;

                    // cardFav.addEventListener("click", (e) => {

                    //     cardFav.innerHTML = `<i class = "far fa-heart fa-xs"></i>`;

                    //     firebase.database().ref(`/favAds/${currentUser.uid}/`).child(adKey).remove();

                    // });

                    // cardChat.addEventListener("click", (e) => {

                    //     if (currentUser.uid === ad.uid) {
                    //         swal({
                    //             title: "Alert!",
                    //             text: "Sorry,You Can't Chat with Yourself.",
                    //             icon: "warning",
                    //         });
                    //     }
                    //     else {
                    //         cardChat.innerHTML = `<i class="fas fa-comments fa-sm"></i>`;
                    //         let currUserDetails = {
                    //             name: currentUser.displayName,
                    //             // email : currentUser.email 
                    //         };

                    //         let ADUserDetails = {
                    //             name: ad.name,
                    //             // email : ad.email 
                    //         };

                    //         let msgObj = {
                    //             name: currentUser.displayName,
                    //             senderUid: currentUser.uid,
                    //             receiverUid: ad.uid,
                    //             msg: 'Assalam U Alaikum',
                    //         };

                    //         localStorage.setItem('chatUser', ad.uid);
                    //         // localStorage.setItem('ADKey', adsKeys);
                    //         // localStorage.setItem('CurrUser', currentUser.uid);
                    //         localStorage.setItem('name', ad.name);


                    //         firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/`).once('value', function (data) {

                    //             console.log(data.val());
                    //             let clientsObj = data.val();

                    //             if (clientsObj === null) {

                    //                 firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/`).set(ADUserDetails)
                    //                 firebase.database().ref(`/ChatArea/${currentUser.uid}/${ad.uid}/Chatting`).push(msgObj)

                    //                 firebase.database().ref(`/ChatArea/${ad.uid}/${currentUser.uid}/`).set(currUserDetails)
                    //                 firebase.database().ref(`/ChatArea/${ad.uid}/${currentUser.uid}/Chatting`).push(msgObj)

                    //                     .then((data) => {

                    //                         location.href = "chat.html";
                    //                     })
                    //             }
                    //             else {
                    //                 location.href = "chat.html";
                    //             }
                    //         });

                    //     }

                    // });

                })

            })
            // })
        }
    }
}

checkInternet()

window.addEventListener('online', () => {
    console.log('You\'re online, You can get the fresh content');
    checkInternet();
});

window.addEventListener('offline', () => {
    console.log('You\'re offline, You can get the cache content');
    checkInternet();
});



$(document).ready(function () {
    $("#searchbar").on("keyup", function () {
        var search = document.getElementById('searchbar');
        var filter = search.value.toLocaleUpperCase();
        var card = document.getElementsByClassName('card');
        var card_body = document.getElementsByClassName('card-body');//li
        // var card_footer = document.getElementsByClassName('card-footer')
        // var h4 = card_body.getElementsByTagName('H4');//a

        for (i = 0; i < card_body.length; i++) {
            var h4 = card_body[i].getElementsByTagName('H4')[0];
            if (h4.innerHTML.toLocaleUpperCase().indexOf(filter) > -1) {
                // card_body[i].style.display = "inline";
                card[i].style.display = 'inline';
                // card_footer[i].setAttribute("class" , "card-footer");
            }
            else {
                // card_body[i].style.display = 'none';
                card[i].style.display = 'none';
                // card_footer[i].setAttribute("class" , "card-footer");
            }
        }
    });
});

function signout() {

    firebase.auth().signOut()
        .then(function () {

            console.log("You are Sign Out");

        }).catch(function (error) {

            console.log("Error," + error);

        });

}


