(function($) {
  "use strict";
  $.fn.sliderResponsive = function(settings) {

    var set = $.extend( 
      {
        slidePause: 4000,
        fadeSpeed: 800,
        autoPlay: "on",
        showArrows: "off", 
        hideDots: "off", 
        hoverZoom: "on",
        titleBarTop: "off"
      },
      settings
    ); 

    var $slider = $(this);
    var size = $slider.find("> div").length; //number of slides
    var position = 0; // current position of carousal
    var sliderIntervalID; // used to clear autoplay

    // Add a Dot for each slide
    $slider.append("<ul></ul>");
    $slider.find("> div").each(function(){
      $slider.find("> ul").append('<li></li>');
    });

    // Put .show on the first Slide
    $slider.find("div:first-of-type").addClass("show");

    // Put .showLi on the first dot
    $slider.find("li:first-of-type").addClass("showli")

     //fadeout all items except .show
    $slider.find("> div").not(".show").fadeOut();

    // If Autoplay is set to 'on' than start it
    if (set.autoPlay === "on") {
        startSlider(); 
    } 

    // If showarrows is set to 'on' then don't hide them
    if (set.showArrows === "on") {
        $slider.addClass('showArrows'); 
    }

    // If hideDots is set to 'on' then hide them
    if (set.hideDots === "on") {
        $slider.addClass('hideDots'); 
    }

    // If hoverZoom is set to 'off' then stop it
    if (set.hoverZoom === "off") {
        $slider.addClass('hoverZoomOff'); 
    }

    // If titleBarTop is set to 'on' then move it up
    if (set.titleBarTop === "on") {
        $slider.addClass('titleBarTop'); 
    }

    // function to start auto play
    function startSlider() {
      sliderIntervalID = setInterval(function() {
        nextSlide();
      }, set.slidePause);
    }

    // on mouseover stop the autoplay
    $slider.mouseover(function() {
      if (set.autoPlay === "on") {
        clearInterval(sliderIntervalID);
      }
    });

    // on mouseout starts the autoplay
    $slider.mouseout(function() {
      if (set.autoPlay === "on") {
        startSlider();
      }
    });

    //on right arrow click
    $slider.find("> .right").click(nextSlide)

    //on left arrow click
    $slider.find("> .left").click(prevSlide);

    // Go to next slide
    function nextSlide() {
      position = $slider.find(".show").index() + 1;
      if (position > size - 1) position = 0;
      changeCarousel(position);
    }

    // Go to previous slide
    function prevSlide() {
      position = $slider.find(".show").index() - 1;
      if (position < 0) position = size - 1;
      changeCarousel(position);
    }

    //when user clicks slider button
    $slider.find(" > ul > li").click(function() {
      position = $(this).index();
      changeCarousel($(this).index());
    });

    //this changes the image and button selection
    function changeCarousel() {
      $slider.find(".show").removeClass("show").fadeOut();
      $slider
        .find("> div")
        .eq(position)
        .fadeIn(set.fadeSpeed)
        .addClass("show");
      // The Dots
      $slider.find("> ul").find(".showli").removeClass("showli");
      $slider.find("> ul > li").eq(position).addClass("showli");
    }

    return $slider;
  };
})(jQuery);


//-------------------------------Native JavaScript On DocumentReady Function--------------------------------
document.addEventListener("DOMContentLoaded", function (event) {
  //draw Top nav items from json
  init();
  //slider
  $("#slider1").sliderResponsive({
    // Using default everything
       slidePause: 5000,
       fadeSpeed: 800,
       autoPlay: "on",
       showArrows: "off", 
       hideDots: "off", 
       hoverZoom: "on", 
      // titleBarTop: "off"
    });
});


//--------------------------json object------------------------
var obj = [
  { label: "Login", link: "#" },
  { label: "Signup", link: "#" },
  { label: "Help", link: "#" },
  { label: "Become a Host", link: "#" },
  { label: "$USB", link: "#" },
  { label: "English", link: "#" },
  { label: "arabic", link: "#" }
];



//--------------------------calling Draw Fun-------------------------
function addListDesign(topNavItems) {
  var myElement = document.getElementById("collapsibleNavId");

  var ul = document.createElement('ul');

  ul.setAttribute('class', 'navbar-nav ml-auto mt-2 mt-lg-0');


  myElement.appendChild(ul);
  topNavItems.forEach(function (element) {
    var li = document.createElement('li');
    li.setAttribute('class', 'nav-item');
    ul.appendChild(li);

    var a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    a.setAttribute("href", element.link);
    li.appendChild(a);
    a.innerHTML = a.innerHTML + element.label;
  });



}


//check if json empty or not call draw fun
function init(){
  var xhttp = new XMLHttpRequest();
  xhttp.responseType ="json";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      console.log(this.response) ;

      if(this.response.length){
        addListDesign( this.response);
       }else{
         alert("No Data Found");
       }
       
    }
  };
  xhttp.open("GET", "http://localhost/json.php", true);
  xhttp.send();
  
    
}


