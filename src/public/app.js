export default function logout() {
    const loginLink = document.getElementById("login-link");
    loginLink.textContent = "Logout";
    loginLink.setAttribute("href", "#");

    // Add event listener to handle logout click (once)
    loginLink.addEventListener(
        "click",
        function logoutHandler(event) {
            console.log("Logout successful");
            // Perform logout actions here
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("token");
            loginLink.textContent = "Login";
            loginLink.setAttribute(
                "href",
                "/login"
            );

            // Remove the event listener after it has been executed
            loginLink.removeEventListener("click", logoutHandler);
        },
        {once: true}
    );
}

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginLink = document.getElementById("login-link");
    if (isLoggedIn) {
        logout();
    } else {
        loginLink.textContent = "Login";
        loginLink.setAttribute("href", "/login");
    }
});


