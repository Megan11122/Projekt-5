
let days = [
    { dato: "Man. 8/12", event: "Klang<br>kl. 17–18.30" },
    { dato: "Tir. 9/12", event: "" },
    { dato: "Ons. 10/12", event: "Juleklip<br>kl. 15–18" },
    { dato: "Tor. 11/12", event: "" },
    { dato: "Fre. 12/12", event: "Yoga<br>kl. 15–17" }
  ];
  

  let grid = document.getElementById("calendarGrid");
  

  for (let i = 0; i < days.length; i++) {
  
   
    let dayBox = document.createElement("article");
    dayBox.className = "calendar-day";
  
    let header = document.createElement("div");
    header.className = "day-header";
    header.innerHTML = days[i].dato;
  

    let body = document.createElement("div");
    body.className = "day-body";
    body.innerHTML = days[i].event;


  
    
    dayBox.appendChild(header);
    dayBox.appendChild(body);

    body.addEventListener("click", function () {
        if (days[i].event !== "") {
          showPopup(days[i].dato, days[i].event);
        }
      });
      
    
    grid.appendChild(dayBox);
    let popup = document.getElementById("popupBox");

function showPopup(dato, eventText) {
  popup.querySelector("h3").innerHTML = dato;
  popup.querySelector("p").innerHTML = eventText;

  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}

  }
  