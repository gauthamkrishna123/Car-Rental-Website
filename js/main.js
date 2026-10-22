// DriveEase homepage interactions
const carGrid = document.querySelector("#carGrid");
const emptyState = document.querySelector("#emptyState");
const searchForm = document.querySelector("#searchForm");
const searchMessage = document.querySelector("#searchMessage");
const carType = document.querySelector("#carType");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector("#themeToggle");
const backToTop = document.querySelector("#backToTop");

// Render the car cards from the data array.
function renderCars(list) {
  if (!carGrid) return;

  carGrid.innerHTML = list.map(car => `
    <article class="car-card">
      <div class="car-image-wrap">
        <img class="car-image" src="${car.image}" alt="${car.alt}" loading="lazy">
        <span class="car-badge">${car.category}</span>
      </div>
      <div class="car-body">
        <h3>${car.name}</h3>
        <div class="car-specs">
          <span aria-label="${car.seats} seats">♟ ${car.seats} Seats</span>
          <span>⛽ ${car.fuel}</span>
          <span>⚙ ${car.transmission}</span>
        </div>
        <p class="car-price">₹ ${car.price.toLocaleString("en-IN")} <small>/ day</small></p>
        <a class="button" href="details.html?id=${car.id}">View Details <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join("");

  if (emptyState) emptyState.hidden = list.length > 0;
}

renderCars(cars.slice(0,4));

// Mobile navigation menu.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Dark mode preference is remembered in localStorage.
function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}
if (themeToggle) {
  const savedTheme = localStorage.getItem("driveease-theme");
  setTheme(savedTheme === "dark");
  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
    localStorage.setItem("driveease-theme", isDark ? "dark" : "light");
  });
}

// Set sensible minimum dates and validate search form dates.
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const pickupInput = document.querySelector("#pickupDate");
const returnInput = document.querySelector("#returnDate");
if (pickupInput) pickupInput.min = localToday;
if (returnInput) returnInput.min = localToday;

if (pickupInput && returnInput) {
  pickupInput.addEventListener("change", () => {
    returnInput.min = pickupInput.value || localToday;
    if (returnInput.value && returnInput.value < pickupInput.value) {
      returnInput.value = "";
    }
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const pickup = pickupInput.value;
    const returnDate = returnInput.value;
    const selectedType = carType.value;

    if (!pickup || !returnDate) {
      searchMessage.textContent = "Please choose both pickup and return dates.";
      return;
    }
    if (pickup < localToday) {
      searchMessage.textContent = "Pickup date must be today or a future date.";
      return;
    }
    if (returnDate <= pickup) {
      searchMessage.textContent = "Return date must be after the pickup date.";
      return;
    }

    const filteredCars = selectedType === "All"
      ? cars
      : cars.filter(car => car.category === selectedType);

    renderCars(filteredCars);
    searchMessage.textContent = `${filteredCars.length} car(s) found for your selected dates. Dates are for this demo search.`;
    document.querySelector("#featured").scrollIntoView({ behavior: "smooth" });
  });
}

// Back-to-top button appears after scrolling.
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Current year in the footer.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
