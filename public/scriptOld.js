function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".fa-bars")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("oldbusid").textContent = idd;
  document.getElementById("here").textContent = lhere;
  document.getElementById("there").textContent = lthere;

});

var idd=getURLParameter("id");
var lhere=getURLParameter("from");
var lthere=getURLParameter("to");
console.log("bussidd "+idd);

function redirectToDailyPass() {
  window.location.href = "dailyPass.html?id="+idd;
}
function redirectToBookTicket() {
  if(idd==298)
  {
    window.location.href = "bookTicketnew.html?id="+idd;
  }
  else if(idd==250)
  {
    window.location.href = "route1.html?id="+idd;
  }
}

var totalFare;
let selectOptions;
let selectedTickets;
let farePerTicket;

async function booknow(passId) {
  // console.log("Bus Id");

  selectOptions = document.getElementById("selectOptions" + passId);

  // Get the selected tickets
  selectedTickets = parseInt(selectOptions.value);

  // Calculate the total fare
  farePerTicket = passId === 1 ? 40 : passId === 2 ? 50 : 80;
  // Adjust fare based on passId
  totalFare = selectedTickets * farePerTicket;


  // Redirect to confirm_booking.html and pass data via URL parameters
  // console.log("bussidd 3 "+idd);   
  window.location.href ="confirm_booking.html?tickets=" +selectedTickets +"&totalFare=" +totalFare+"&busid="+idd;

}

// console.log(totalFare);    

// Modify the existing booknow1 function to call the new booknow function
function booknow1() {
  console.log(totalFare);
  console.log("totalFare");

  booknow(1);
}

function booknow2() {
  console.log(totalFare);
  console.log("totalFare");

  booknow(2);
}

function booknow3() {
  console.log(totalFare);
  console.log("totalFare");

  booknow(3);
}




// Add this function to read URL parameters
function getURLParameter(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

let source=document.getElementById("source");
let dest=document.getElementById("Destination");
let bus=document.getElementById("bus");


// Add this code to update the spans in confirm_booking.html
document.addEventListener("DOMContentLoaded", function () {
  // Get the values from URL parameters
  var tickets = getURLParameter("tickets");
  totalFare = getURLParameter("totalFare");

  // Update the spans in the confirm_booking.html file

  document.getElementById("ticket").textContent = tickets;
  document.getElementById("rs").textContent = totalFare;
  bus.textContent=getURLParameter("busid");
  // document.getElementById("passPrice").textContent = totalFare;
}); 


var btn=document.getElementById("rzp-button1");

// console.log(busId);


console.log("bussidd 2 "+getURLParameter("busid"));

async function getTickets() {
  var tickets = getURLParameter("tickets");
  var ide=getURLParameter("id");
  window.location.href ="passTicket.html?tickets=" +tickets +"&totalFare=" +totalFare+ "&id="+getURLParameter("busid");

}

// var dateElement = document.getElementById("date");
// var timeElement = document.getElementById("time");
 
var currentDate = new Date();

var dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
var timeString = currentDate.toLocaleTimeString('en-US');

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("passPrice").textContent = totalFare;
  document.getElementById("bus-id").textContent = idd;
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
  document.getElementById("tckkt").textContent = getURLParameter("tickets");

  
 
  console.log(dateString);
  console.log(timeString);
 
}); 

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("src").textContent=getURLParameter("from");
  document.getElementById("dest").textContent=getURLParameter("to");
  document.getElementById("passPrice1").textContent=getURLParameter("fare");
  document.getElementById("bus-id1").textContent=getURLParameter("id");
  document.getElementById("tkt").textContent = getURLParameter("pass");
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
})