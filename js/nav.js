$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
          document.getElementById("containerfluid").style.position = "relative"; 
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
          document.getElementById("containerfluid").style.position = "fixed"; 
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  
  });

//   var fixed = document.getElementById('containerfluid');

// fixed.addEventListener('touchmove', function(e) {

//         e.preventDefault();

// }, false);


  function searchAds() {

    document.getElementById("searchopen").style.display = "none";
    document.getElementById("navbrand").style.display = "none"; 
    // document.getElementById("navpostad").style.display = "none"; 
    document.getElementById("navsearch").style.display = "inline-block";
    document.getElementById("searchclose").style.display = "inline-block";
  
  }
  
  function searchReturn() {
    // document.getElementById("navpostad").style.display = "inline-block"; 
    document.getElementById("searchopen").style.display = "inline-block";
    document.getElementById("navbrand").style.display = "inline-block"; 
    document.getElementById("navsearch").style.display = "none";
    document.getElementById("searchclose").style.display = "none";
  
  }