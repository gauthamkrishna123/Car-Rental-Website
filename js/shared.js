
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const opened = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(opened));
        menuToggle.textContent = opened ? "✕" : "☰";
    });
}

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}
