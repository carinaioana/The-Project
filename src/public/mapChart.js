import logout from "./app";

const isLoggedIn = localStorage.getItem("token");

if (isLoggedIn) {
    logout();
}
