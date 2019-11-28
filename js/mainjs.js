//-------------------------------Native JavaScript On DocumentReady Function--------------------------------
document.addEventListener("DOMContentLoaded", function (event) {
  //draw Top nav items from json
  init();
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

  if(JSON.stringify(obj).length){
   addListDesign(JSON.parse(JSON.stringify(obj)));
  }else{
    alert("No Data Found");
  }
    
}


