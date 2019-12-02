// (function($) {
//   "use strict";
//   $.fn.sliderResponsive = function(settings) {

//     var set = $.extend(
//       {
//         slidePause: 4000,
//         fadeSpeed: 800,
//         autoPlay: "on",
//         showArrows: "off",
//         hideDots: "off",
//         hoverZoom: "on",
//         titleBarTop: "off"
//       },
//       settings
//     );

//     var $slider = $(this);
//     var size = $slider.find("> div").length; //number of slides
//     var position = 0; // current position of carousal
//     var sliderIntervalID; // used to clear autoplay

//     // Add a Dot for each slide
//     $slider.append("<ul></ul>");
//     $slider.find("> div").each(function(){
//       $slider.find("> ul").append('<li></li>');
//     });

//     // Put .show on the first Slide
//     $slider.find("div:first-of-type").addClass("show");

//     // Put .showLi on the first dot
//     $slider.find("li:first-of-type").addClass("showli")

//      //fadeout all items except .show
//     $slider.find("> div").not(".show").fadeOut();

//     // If Autoplay is set to 'on' than start it
//     if (set.autoPlay === "on") {
//         startSlider();
//     }

//     // If showarrows is set to 'on' then don't hide them
//     if (set.showArrows === "on") {
//         $slider.addClass('showArrows');
//     }

//     // If hideDots is set to 'on' then hide them
//     if (set.hideDots === "on") {
//         $slider.addClass('hideDots');
//     }

//     // If hoverZoom is set to 'off' then stop it
//     if (set.hoverZoom === "off") {
//         $slider.addClass('hoverZoomOff');
//     }

//     // If titleBarTop is set to 'on' then move it up
//     if (set.titleBarTop === "on") {
//         $slider.addClass('titleBarTop');
//     }

//     // function to start auto play
//     function startSlider() {
//       sliderIntervalID = setInterval(function() {
//         nextSlide();
//       }, set.slidePause);
//     }

//     // on mouseover stop the autoplay
//     $slider.mouseover(function() {
//       if (set.autoPlay === "on") {
//         clearInterval(sliderIntervalID);
//       }
//     });

//     // on mouseout starts the autoplay
//     $slider.mouseout(function() {
//       if (set.autoPlay === "on") {
//         startSlider();
//       }
//     });

//     //on right arrow click
//     $slider.find("> .right").click(nextSlide)

//     //on left arrow click
//     $slider.find("> .left").click(prevSlide);

//     // Go to next slide
//     function nextSlide() {
//       position = $slider.find(".show").index() + 1;
//       if (position > size - 1) position = 0;
//       changeCarousel(position);
//     }

//     // Go to previous slide
//     function prevSlide() {
//       position = $slider.find(".show").index() - 1;
//       if (position < 0) position = size - 1;
//       changeCarousel(position);
//     }

//     //when user clicks slider button
//     $slider.find(" > ul > li").click(function() {
//       position = $(this).index();
//       changeCarousel($(this).index());
//     });

//     //this changes the image and button selection
//     function changeCarousel() {
//       $slider.find(".show").removeClass("show").fadeOut();
//       $slider
//         .find("> div")
//         .eq(position)
//         .fadeIn(set.fadeSpeed)
//         .addClass("show");
//       // The Dots
//       $slider.find("> ul").find(".showli").removeClass("showli");
//       $slider.find("> ul > li").eq(position).addClass("showli");
//     }

//     return $slider;
//   };
// })(jQuery);
var sliderIntervalID; // used to clear autoplay
// -------------------------------Draw Indicator slider card------------------------------------------
function addIndicator() {
    //var sliderCard = document.getElementById("slider1");
    var sliderCard = document.getElementsByClassName("sliderClass");
    console.log(sliderCard.length);
    for (j = 0; j< sliderCard.length; j++) {

      console.log(sliderCard[j]);
      var size = sliderCard[j].getElementsByTagName("div").length; //number of slides
      console.log(size);
      var position = 0; // current position of carousal
     
    // Put .show on the first  Slide image
    sliderCard[j].getElementsByTagName("div")[0].setAttribute("class","show");
  
    var ol = document.createElement("ol");
    ol.setAttribute("class", "carousel-indicators");
    ol.setAttribute("id", "list2");
  
    sliderCard[j].appendChild(ol); //append ol inside slider
    var i = 0;
    for (i = 0; i < size; i++) {
      var li = document.createElement("li");
      li.setAttribute("data-slide-to", i);
      ol.appendChild(li);
    }
  
    // Put active on the first dot
    var liactive = sliderCard[j].getElementsByTagName("li")[0];
    liactive.setAttribute("class", "active");
  
    //on right arrow click
    // Go to next slide
    document.getElementById("rightArrow").onclick = function(e) {
      nextSlide(sliderCard[j],size);
    };
  
    //on left arrow click
    // Go to previous slide
    document.getElementById("leftArrow").onclick = function(e) {
      console.log("clickLeft");
      var domElements = document.getElementById("list2").childNodes;
      for (var i = 0; i < domElements.length; i++) {
        if (domElements[i].className === "active") {
          // index i
          position = i - 1;
          console.log(position);
        }
      }
      console.log(position);
      if (position < 0) position = size - 1;
      changeCarousel(position,domElements,sliderCard[j]);
    };
  
      //start auto display
      startSlider(sliderCard[j],size) ;
  
      //on hover slider 
      sliderCard[j].addEventListener("mouseover", function( event ) {
        console.log('called on hover'); //just to make sure the function is getting called   
        
         clearInterval(sliderIntervalID);
      }, false);    
  
      //on hover slider 
      sliderCard[j].addEventListener("mouseout", function( event ) {
        console.log('mouse out'); //just to make sure the function is getting called   
       
        startSlider(sliderCard[j],size);
      }, false); 
  
     
  
    var domElements = document.getElementById("list2");
    domElements.onclick = function(e) {
      console.log(e.target.getAttribute('data-slide-to'));
     
     //indicator slider remove old bullot 
      for (var i = 0; i < domElements.childNodes.length; i++) {
        if (domElements.childNodes[i].className === "active") {
          domElements.childNodes[i].classList.remove("active")
        }
      }
    
      //set new bullet
      e.target.setAttribute("class","active");
  
    //image slider remove old img 
    for (var i = 0; i < sliderCard[j].getElementsByTagName("div").length; i++) {
      if (sliderCard[j].getElementsByTagName("div")[i].className === "show") {
        sliderCard[j].getElementsByTagName("div")[i].classList.remove("show")
      }
    }
  
    //set new image
    sliderCard[j].getElementsByTagName("div")[e.target.getAttribute('data-slide-to')].setAttribute("class","show");
  
    };
  
  

    }
    
   
}


function startSlider(sliderCard,size) {
 // function to start auto play
 sliderIntervalID = setInterval( function() 
 {
   nextSlide(sliderCard,size);
 }, 5000);
}

function nextSlide(sliderCard,size) {
  var domElements = document.getElementById("list2").childNodes;
    for (var i = 0; i < domElements.length; i++) {
      if (domElements[i].className === "active") {
        // index i
        position = i + 1;
        console.log(position);
      }
    }

    if (position > size - 1) position = 0;
    changeCarousel(position,domElements,sliderCard);
}

//this changes the image and button selection
function changeCarousel(pos,domElements,sliderCard) {
  sliderCard.getElementsByClassName("active")[0].classList.remove("active");
  
  //dots
  domElements[pos].setAttribute("class","active");
 
  //image slider remove old img 
  for (var i = 0; i < sliderCard.getElementsByTagName("div").length; i++) {
    if (sliderCard.getElementsByTagName("div")[i].className === "show") {
      sliderCard.getElementsByTagName("div")[i].classList.remove("show")
    }
  }

  //set new image
  sliderCard.getElementsByTagName("div")[pos].setAttribute("class","show");
}

//-------------------------------Native JavaScript On DocumentReady Function--------------------------------
document.addEventListener("DOMContentLoaded", function(event) {
  //draw Top nav items from json
  init();
  addIndicator();
  
});

//--------------------------calling Draw Fun-------------------------
function addListDesign(topNavItems) {
  var myElement = document.getElementById("collapsibleNavId");

  var ul = document.createElement("ul");

  ul.setAttribute("class", "navbar-nav ml-auto mt-2 mt-lg-0");

  myElement.appendChild(ul);
  topNavItems.forEach(function(element) {
    var li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    ul.appendChild(li);

    var a = document.createElement("a");
    a.setAttribute("class", "nav-link");
    a.setAttribute("href", element.link);
    li.appendChild(a);
    a.innerHTML = a.innerHTML + element.label;
  });
}

//check if json empty or not call draw fun
function init() {
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = "json";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);

      if (this.response.length) {
        addListDesign(this.response);
      } else {
        alert("No Data Found");
      }
    }
  };
  xhttp.open("GET", "http://localhost/json.php", true);
  xhttp.send();
}

// //--------------------------json object------------------------
// var obj = [
//   { label: "Login", link: "#" },
//   { label: "Signup", link: "#" },
//   { label: "Help", link: "#" },
//   { label: "Become a Host", link: "#" },
//   { label: "$USB", link: "#" },
//   { label: "English", link: "#" },
//   { label: "arabic", link: "#" }
// ];
