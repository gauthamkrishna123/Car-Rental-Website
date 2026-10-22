
const carGrid = document.querySelector("#carGrid");
const emptyState = document.querySelector("#emptyState");

function renderCars(list) {
    if (!carGrid) return;

    carGrid.innerHTML = list.map(car => `
        <article class="car-card">
            <div class="car-image-wrap">
                <img
                    class="car-image"
                    src="${car.image}"
                    alt="${car.alt}"
                    loading="lazy"
                >
                <span class="car-badge">${car.category}</span>
            </div>

            <div class="car-body">
                <h3>${car.name}</h3>

                <div class="car-specs">
                    <span>${car.seats} Seats</span>
                    <span>${car.fuel}</span>
                    <span>${car.transmission}</span>
                </div>

                <p class="car-price">
                    ₹ ${car.price.toLocaleString("en-IN")}
                    <small>/ day</small>
                </p>

                <a class="button" href="details.html?id=${car.id}">
                    View Details →
                </a>
            </div>
        </article>
    `).join("");

    if (emptyState) {
        emptyState.hidden = list.length > 0;
    }
}

// Render all cars when the page loads
renderCars(cars);