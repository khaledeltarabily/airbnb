var sliderIntervalID; // used to clear autoplay

//-------------------------------Native JavaScript On DocumentReady Function--------------------------------
document.addEventListener("DOMContentLoaded", function(event) {
  //draw Top nav items from json
  init();
  addIndicator();
  
});


// -------------------------------Draw Indicator slider card------------------------------------------
function addIndicator() {
    //var sliderCard = document.getElementById("slider1");
    var sliderCards = document.getElementsByClassName("sliderClass");
    console.log(sliderCards.length);
    for (j = 0; j< sliderCards.length; j++) {

      console.log(sliderCards[j]);
      var size = sliderCards[j].getElementsByTagName("div").length; //number of slides
      console.log(size);
      var position = 0; // current position of carousal
     
      // Put .show on the first  Slide image
      sliderCards[j].getElementsByTagName("div")[0].setAttribute("class","show");
    
      var ol = document.createElement("ol");
      ol.setAttribute("class", "carousel-indicators");
      ol.setAttribute("id", "list2");
    
      sliderCards[j].appendChild(ol); //append ol inside slider
      var i = 0;
      for (i = 0; i < size; i++) {
        var li = document.createElement("li");
        li.setAttribute("data-slide-to", i);
        ol.appendChild(li);
      }
    
      // Put active on the first dot
      var liactive = sliderCards[j].getElementsByTagName("li")[0];
      liactive.setAttribute("class", "active");
    
      //on right arrow click
      // Go to next slide
      document.getElementById("rightArrow").onclick = function(e) {
        nextSlide(sliderCards[j],size);
      };
    

      //start auto display
      startSlider(sliderCards[j],size) ;
  
     
    }
    

     //on hover slider  stop timer for slider
      // sliderCards[j].addEventListener("mouseover", function( event ) {
      //   console.log('called on hover'); //just to make sure the function is getting called   
        
      //    clearInterval(sliderIntervalID);
      // }, false);    
  
      // //on hover slider  start timer again for slider
      // sliderCards[j].addEventListener("mouseout", function( event ) {
      //   console.log('mouse out'); //just to make sure the function is getting called   
       
      //   startSlider(sliderCards[j],size);
      // }, false); 
  


   

    // on left arrow click
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
        changeCarousel(position,domElements,sliderCards);
      };
    

      var domElements = document.getElementById("list2");
      domElements.onclick = function(e) {
        console.log(e.target.getAttribute('data-slide-to'));
      
      //indicator slider remove old bullot 
        for (var i = 0; i < domElements.childNodes.length; i++) {
          if (domElements.childNodes[i].className === "active") {
            domElements.childNodes[i].classList.remove("active");
            break;
          }
        }
      
        //set new bullet
        e.target.setAttribute("class","active");
    
      //image slider remove old img 
      for (var i = 0; i < sliderCards.getElementsByTagName("div").length; i++) {
        if (sliderCards.getElementsByTagName("div")[i].className === "show") {
          sliderCards.getElementsByTagName("div")[i].classList.remove("show");
          break;
        }
      }
    
      //set new image
      sliderCards.getElementsByTagName("div")[e.target.getAttribute('data-slide-to')].setAttribute("class","show");
    
    };


}

//timer count
function startSlider(sliderCard,size) {
 // function to start auto play
 sliderIntervalID = setInterval( function() 
 {
   nextSlide(sliderCard,size);
 }, 5000);
}

//switch to next image and bullet
function nextSlide(sliderCard,size) {
  
  var domElements = sliderCard.querySelector("ol").childNodes;
  var i ; 
  for (i = 0; i < domElements.length; i++) {
      if (domElements[i].className == "active") {
        // index i
        position = i + 1;
        console.log(position);
        break;
      }
    }

    if (position > size - 1) position = 0;
    console.log(sliderCard);
    changeCarousel(position,domElements,sliderCard);
}

//this changes the image and button selection
function changeCarousel(pos,domElements,sliderCard) {
  console.log(sliderCard.getElementsByClassName("active")[0]);
  sliderCard.getElementsByClassName("active")[0].classList.remove("active");
  
  //dots
  domElements[pos].setAttribute("class","active");
 
  //image slider remove old img 
  for (var i = 0; i < sliderCard.getElementsByTagName("div").length; i++) {
    if (sliderCard.getElementsByTagName("div")[i].className === "show") {
      sliderCard.getElementsByTagName("div")[i].classList.remove("show");
      break;
    }
  }

  //set new image
  sliderCard.getElementsByTagName("div")[pos].setAttribute("class","show");
}



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
