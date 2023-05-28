import logout from "./app.js";

// Get references to the modal and its elements
const modal = document.getElementById('errorModal');
const errorMessageElement = document.getElementById('errorMessage');
const closeModalElement = document.getElementById('closeModal');

// Function to display the modal with the error message
function showErrorModal(errorMessage) {
    errorMessageElement.textContent = errorMessage;
    modal.classList.add('show');
}

// Function to hide the modal
function hideErrorModal() {
    modal.classList.remove('show');
}

// Close the modal when the close button is clicked
closeModalElement.addEventListener('click', hideErrorModal);

document
    .querySelector(".container")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get the form inputs
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Create an object with the user credentials
        const credentials = {
            username: username,
            password: password,
        };

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open("POST", "http://localhost:3000/api/auth/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        // Handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("Login successful!");
                // Perform any necessary actions (e.g., redirect, display success message, etc.)
                const token = response.token;

                localStorage.setItem("token", token);
                localStorage.setItem("isLoggedIn", true);
                logout();
                window.location.href = "/";

                return false;
            } else {
                showErrorModal('Login failed!')
                setTimeout(hideErrorModal, 3000)
                console.log("Login failed!");
                // Perform any necessary actions (e.g., display error message, clear form, etc.)
            }
        };

        // Send the request
        xhr.send(JSON.stringify(credentials));
    });
