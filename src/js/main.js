// Import the helper function that loads the shared header and footer on the page
import { loadHeaderFooter } from "./utils.mjs";

// Run the function so the header and footer appear when the page loads
loadHeaderFooter();

// Grab the newsletter form and the message paragraph from the DOM
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterMessage = document.querySelector("#newsletter-message");

// Only attach the submit listener if the newsletter form exists on this page
if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        // Stop the browser from refreshing the page on form submission
        e.preventDefault();

        // Get the user's typed email and remove extra spaces at the start/end
        const emailInput = document.querySelector("#newsletter-email");
        const email = emailInput.value.trim();

        // Show a thank-you message and clear the input field if an email was entered
        if (email) {
            newsletterMessage.textContent = `Thank you for subscribing, ${email}!`;
            newsletterForm.reset();
        }
    });
}

