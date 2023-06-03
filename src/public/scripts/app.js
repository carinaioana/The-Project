function parseJwt(token) {
  if (!token) {
    return;
  }

  // Split the token and taken the second
  const base64Url = token.split(".")[1];

  // Replace "-" with "+"; "_" with "/"
  const base64 = base64Url.replace("-", "+").replace("_", "/");

  // return the result parsed in JSON
  return JSON.parse(window.atob(base64));
}

export default function showLogout() {
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
      loginLink.setAttribute("href", "/login");

      // Remove the event listener after it has been executed
      loginLink.removeEventListener("click", logoutHandler);
    },
    { once: true }
  );
}

function isAdmin() {
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  if (decodedToken.isAdmin) {
    document.getElementById("admin-button").style.display = "block";
    return true;
  } else {
    document.getElementById("admin-button").style.display = "none";
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginLink = document.getElementById("login-link");
  if (isLoggedIn) {
    showLogout();
    isAdmin();
  } else {
    loginLink.textContent = "Login";
    loginLink.setAttribute("href", "/login");
  }
});
