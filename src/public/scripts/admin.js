// Fetch user data from the backend API
import { showErrorModal } from "./errorHandler.js";

fetch("http://localhost:3000/api/users", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const userList = document.getElementById("userList");
    // Iterate over the user data and create list items with remove buttons
    data.forEach((user) => {
      const listItem = document.createElement("div");
      listItem.classList.add("user-item");

      const username = document.createElement("span");
      username.textContent = user.username;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.id = user.id;
      removeButton.addEventListener("click", (event) => {
        const userId = event.target.id;
        fetch(`http://localhost:3000/api/users/delete/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle successful deletion and update the UI accordingly
            listItem.remove(); // Remove the user item from the UI
          })
          .catch((error) => {
            showErrorModal("Failed to delete user");
            console.error("Error deleting user:", error);
          });
      });

      listItem.appendChild(username);
      listItem.appendChild(removeButton);
      userList.appendChild(listItem);
    });
  })
  .catch((error) => {
    showErrorModal("Not authorized");
    console.error("Error fetching user data:", error);
  });
