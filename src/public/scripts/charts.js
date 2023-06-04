document.addEventListener("DOMContentLoaded", function () {
  const checkboxDropdowns = document.querySelectorAll(".checkbox-dropdown");
  const countySearch = document.getElementById("county-search");
  if (countySearch) {
    // Code that relies on the "county-search" element goes here
    // For example, you can access its properties or add event listeners
    // Handle county search
    countySearch.addEventListener("input", function () {
      let searchValue = this.value.toLowerCase();
      let countyItems = document.querySelectorAll(".checkbox-dropdown-list li");
      countyItems.forEach(function (item) {
        let countyName = item.textContent.toLowerCase();
        if (countyName.indexOf(searchValue) > -1) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
    // Toggle dropdown
    checkboxDropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("click", function () {
        this.classList.toggle("is-active");
      });
    });
  } else {
    // Toggle dropdown
    checkboxDropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("click", function () {
        this.classList.toggle("is-active");
      });
    });
    // Code to handle the case when the "county-search" element is not available goes here
    // For example, you can log an error message or take an alternative action
    return;
  }
  const countyList = document.getElementById("county-list");

  // Stop propagation for dropdown ul click
  const dropdownULs = document.querySelectorAll(".checkbox-dropdown ul");
  dropdownULs.forEach(function (ul) {
    ul.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  // Uncheck other checkboxes
  const checkboxes = document.querySelectorAll(
    '.checkbox-dropdown-list input[type="checkbox"]'
  );
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        const dropdownList = this.closest(".checkbox-dropdown-list");
        const otherCheckboxes = dropdownList.querySelectorAll(
          'input[type="checkbox"]:not(:checked)'
        );
        otherCheckboxes.forEach(function (otherCheckbox) {
          otherCheckbox.checked = false;
        });
      }
    });
  });

  // Generate county list
  let counties = [
    "ALBA",
    "ARAD",
    "ARGES",
    "BACAU",
    "BIHOR",
    "BISTRITA NASAUD",
    "BOTOSANI",
    "BRASOV",
    "BRAILA",
    "BUZAU",
    "CALARASI",
    "CARAS-SEVERIN",
    "CLUJ",
    "CONSTANTA",
    "COVASNA",
    "DAMBOVITA",
    "DOLJ",
    "GALATI",
    "GIURGIU",
    "GORJ",
    "HARGHITA",
    "HUNEDOARA",
    "IALOMITA",
    "IASI",
    "ILFOV",
    "MARAMURES",
    "MUN. BUC.",
    "MEHEDINTI",
    "MURES",
    "NEAMT",
    "OLT",
    "PRAHOVA",
    "SALAJ",
    "SATU MARE",
    "SIBIU",
    "SUCEAVA",
    "TELEORMAN",
    "TIMIS",
    "TULCEA",
    "VALCEA",
    "VASLUI",
    "VRANCEA",
  ];

  counties.forEach(function (county) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "county";
    checkbox.value = county;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(county));
    li.appendChild(label);
    countyList.appendChild(li);
  });

  // Stop propagation for input text.txt click
  let textInputs = document.querySelectorAll(
    '.checkbox-dropdown input[type="text.txt"]'
  );
  textInputs.forEach(function (input) {
    input.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});
