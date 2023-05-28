document.addEventListener("DOMContentLoaded", function () {
    const checkboxDropdowns = document.querySelectorAll(".checkbox-dropdown");
    const countySearch = document.getElementById("county-search");
    const countyList = document.getElementById("county-list");

    // Toggle dropdown
    checkboxDropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("click", function () {
            this.classList.toggle("is-active");
        });
    });

    // Stop propagation for dropdown ul click
    var dropdownULs = document.querySelectorAll(".checkbox-dropdown ul");
    dropdownULs.forEach(function (ul) {
        ul.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    });

    // Uncheck other checkboxes
    var checkboxes = document.querySelectorAll(
        '.checkbox-dropdown-list input[type="checkbox"]'
    );
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                var dropdownList = this.closest(".checkbox-dropdown-list");
                var otherCheckboxes = dropdownList.querySelectorAll(
                    'input[type="checkbox"]:not(:checked)'
                );
                otherCheckboxes.forEach(function (otherCheckbox) {
                    otherCheckbox.checked = false;
                });
            }
        });
    });

    // Handle county search
    countySearch.addEventListener("input", function () {
        var searchValue = this.value.toLowerCase();
        var countyItems = document.querySelectorAll(".checkbox-dropdown-list li");
        countyItems.forEach(function (item) {
            var countyName = item.textContent.toLowerCase();
            if (countyName.indexOf(searchValue) > -1) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Generate county list
    let counties = [
        "ALBA", "ARAD", "ARGES", "BACAU", "BIHOR", "BISTRITA NASAUD", "BOTOSANI", "BRASOV", "BRAILA", "BUZAU",
        "CALARASI", "CARAS-SEVERIN", "CLUJ", "CONSTANTA", "COVASNA", "DAMBOVITA", "DOLJ", "GALATI", "GIURGIU",
        "GORJ", "HARGHITA", "HUNEDOARA", "IALOMITA", "IASI", "ILFOV", "MARAMURES", "MUN. BUC.", "MEHEDINTI",
        "MURES", "NEAMT", "OLT", "PRAHOVA", "SALAJ", "SATU MARE", "SIBIU", "SUCEAVA", "TELEORMAN", "TIMIS",
        "TULCEA", "VALCEA", "VASLUI", "VRANCEA"
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
