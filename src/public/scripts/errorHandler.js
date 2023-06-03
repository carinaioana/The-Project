// Get references to the modal and its elements
const modal = document.getElementById("errorModal");
const errorMessageElement = document.getElementById("errorMessage");
const closeModalElement = document.getElementById("closeModal");

// Function to display the modal with the error message
export function showErrorModal(errorMessage) {
  errorMessageElement.textContent = errorMessage;
  modal.classList.add("show");
  // Close the modal when the close button is clicked
  closeModalElement.addEventListener("click", hideErrorModal);
}

// Function to hide the modal
export function hideErrorModal() {
  modal.classList.remove("show");
}
