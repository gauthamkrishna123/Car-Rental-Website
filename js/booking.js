
const carSelect = document.querySelector("#carSelect");
const pickupInput = document.querySelector("#pickupDate");
const returnInput = document.querySelector("#returnDate");
const bookingForm = document.querySelector("#bookingForm");

const today = new Date();
today.setHours(0, 0, 0, 0);

const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

pickupInput.min = todayString;
returnInput.min = todayString;

// 1. Render cars inside the dropdown using data.js
cars.forEach(car => {
    const option = document.createElement("option");

    option.value = car.id;
    option.textContent =
        `${car.name} - ₹${car.price.toLocaleString("en-IN")}/day`;

    carSelect.appendChild(option);
});

// 2. Find the selected car from the cars array
function getSelectedCar() {
    return cars.find(car => String(car.id) === carSelect.value);
}

// 3. Calculate rental duration
function getRentalDays() {
    if (!pickupInput.value || !returnInput.value) {
        return 0;
    }

    const pickup = new Date(pickupInput.value + "T00:00:00");
    const returnDate = new Date(returnInput.value + "T00:00:00");

    const difference = returnDate - pickup;

    return difference > 0
        ? difference / (1000 * 60 * 60 * 24)
        : 0;
}

// 4. Update the booking summary
function updateSummary() {
    const car = getSelectedCar();
    const days = getRentalDays();

    const price = car ? car.price : 0;
    const total = price * days;

    document.querySelector("#summaryCar").textContent =
        car ? car.name : "Not selected";

    document.querySelector("#dailyPrice").textContent =
        "₹ " + price.toLocaleString("en-IN");

    document.querySelector("#rentalDays").textContent =
        `${days} day${days === 1 ? "" : "s"}`;

    document.querySelector("#totalPrice").textContent =
        "₹ " + total.toLocaleString("en-IN");
}

// Update summary when the user changes any selection
carSelect.addEventListener("change", updateSummary);
pickupInput.addEventListener("change", () => {
    returnInput.min = pickupInput.value || todayString;

    if (returnInput.value && returnInput.value <= pickupInput.value) {
        returnInput.value = "";
    }

    updateSummary();
});
returnInput.addEventListener("change", updateSummary);

// 5. Validate the form
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const location = document.querySelector("#pickupLocation").value.trim();

    const pickup = pickupInput.value;
    const returnDate = returnInput.value;
    const car = getSelectedCar();

    let valid = true;

    // Clear old error messages
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    document.querySelector("#bookingMessage").textContent = "";

    function showError(id, message) {
        document.querySelector(id).textContent = message;
        valid = false;
    }

    if (name.length < 2) {
        showError("#nameError", "Enter your full name.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("#emailError", "Enter a valid email address.");
    }

    if (!/^\d{10}$/.test(phone)) {
        showError("#phoneError", "Enter exactly 10 digits.");
    }

    if (!car) {
        showError("#carError", "Please select a car.");
    }

    if (!pickup || pickup <= todayString) {
        showError("#pickupError", "Choose a future pickup date.");
    }

    if (!returnDate || !pickup || returnDate <= pickup) {
        showError("#returnError", "Return must be after pickup.");
    }

    if (!location) {
        document.querySelector("#pickupLocation").setCustomValidity(
            "Enter your pickup location."
        );
        showError("#locationError", "Enter your pickup location.");
    } else {
        document.querySelector("#pickupLocation").setCustomValidity("");
    }

    if (!valid) return;

    // Demo confirmation only; no real booking is created.
    const days = getRentalDays();
    const total = car.price * days;

    document.querySelector("#bookingMessage").textContent =
        `Demo booking successful! ${car.name}, ${days} day(s), estimated total ₹${total.toLocaleString("en-IN")}. No real car has been reserved.`;

    bookingForm.reset();
    returnInput.min = todayString;
    updateSummary();
});

updateSummary();
