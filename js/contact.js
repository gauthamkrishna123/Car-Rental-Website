
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#contactName").value.trim();
        const email = document.querySelector("#contactEmail").value.trim();
        const subject = document.querySelector("#contactSubject").value.trim();
        const message = document.querySelector("#contactMessage").value.trim();

        const errors = {
            contactNameError: "",
            contactEmailError: "",
            contactSubjectError: "",
            contactMessageError: ""
        };

        const success = document.querySelector("#contactSuccess");
        success.hidden = true;

        if (name.length < 2) {
            errors.contactNameError = "Enter your name.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.contactEmailError = "Enter a valid email address.";
        }

        if (!subject) {
            errors.contactSubjectError = "Enter a subject.";
        }

        if (message.length < 10) {
            errors.contactMessageError =
                "Message must contain at least 10 characters.";
        }

        let valid = true;

        Object.entries(errors).forEach(([id, errorMessage]) => {
            document.querySelector(`#${id}`).textContent = errorMessage;

            if (errorMessage) {
                valid = false;
            }
        });

        if (!valid) return;

        success.textContent =
            `Thank you, ${name}! Your demo message has been validated. No email was sent.`;

        success.hidden = false;
        contactForm.reset();
    });
}
