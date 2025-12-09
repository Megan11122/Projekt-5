/* CECILIE */ 
let selectedDates = []; 
const calendar = document.getElementById("locus-calendar");
const form = document.getElementById("bookingForm");

let cells = calendar.querySelectorAll("td");

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(clickedCell) {
        let chosen = clickedCell.target.textContent;

        if (chosen === "") return;
        selectedDates.push(chosen);

        clickedCell.target.style.background = "#6E6D42";
    });
}

function calculatePrice() {
    let basePrice = 1800; 
    let totalNights = selectedDates.length;
    return basePrice * totalNights;
}

form.addEventListener("submit", function(formSubmission) {
    formSubmission.preventDefault();

    let navn = document.getElementById("navn").value;
    let email = document.getElementById("email").value;
    let landekode = document.getElementById("landekode").value;
    let phone = document.getElementById("phone").value;
    let persons = document.getElementById("persons").value;
    let extra = document.getElementById("extra").value;

    if (navn === "" || email === "" || phone === "") {
        alert("Udfyld venligst alle felterne");
        return;
    }

    let bookingInfo = {
        navn: navn,
        email: email,
        telefon: landekode + phone,
        personer: persons,
        ekstra: extra,
        datoer: selectedDates
    };

    let price = calculatePrice();

    alert(
        "Tak for din booking!\n\n" +
        "Navn: " + bookingInfo.navn + "\n" +
        "Email: " + bookingInfo.email + "\n" +
        "Telefon: " + bookingInfo.telefon + "\n" +
        "Personer: " + bookingInfo.personer + "\n" +
        "Ekstra opredning: " + bookingInfo.ekstra + "\n" +
        "Valgte datoer: " + bookingInfo.datoer.join(", ") + "\n" +
        "Total pris: " + price + " kr."
    );
});

