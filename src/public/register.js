import logout from "./app.js";

document
    .querySelector(".container")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get the form inputs
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            return;
        }
        // Create an object with the user credentials
        const credentials = {
            email: email,
            username: username,
            password: password,
        };

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open("POST", "http://localhost:3000/api/auth/register");
        xhr.setRequestHeader("Content-Type", "application/json");

        // Handle the response
        xhr.onload = function () {
            if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                console.log("Registration successful!");
                // Perform any necessary actions (e.g., redirect, display success message, etc.)
                const token = response.token;
                localStorage.setItem("token", token);
                localStorage.setItem("isLoggedIn", true);
                logout();
                window.location.href = "/";
            } else {
                console.log("Registration failed!");
                // Perform any necessary actions (e.g., display error message, clear form, etc.)
            }
        };

        // Send the request
        xhr.send(JSON.stringify(credentials));
    });
