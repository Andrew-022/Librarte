document.addEventListener("DOMContentLoaded", function() {
    var dropdownBtn = document.getElementById("dropdownBtn");
    var popup = document.getElementById("popup");
    var overlay = document.querySelector(".overlay");

    dropdownBtn.addEventListener("click", function(event) {
        popup.style.display = "block";
        overlay.style.display = "block";

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var popupWidth = popup.offsetWidth;
        var popupHeight = popup.offsetHeight;

        var topPosition = (windowHeight - popupHeight) / 2;
        var leftPosition = (windowWidth - popupWidth) / 2;

        popup.style.top = topPosition + "px";
        popup.style.left = leftPosition + "px";

        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        // Check if clicked outside popup
        if (!popup.contains(event.target) && event.target !== dropdownBtn) {
            popup.style.display = "none";
            overlay.style.display = "none";
        }
    });

    // Stop click if clicked menu button
    dropdownBtn.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let nameElement = document.querySelector('.personal-data-name');
    let lastNameElement = document.querySelector('.personal-data-last-name');
    let usernameElement = document.querySelector('.personal-data-username');
    let emailElement = document.querySelector('.personal-data-email');

    let userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        let testData = {
            name: "testName",
            lastName: "testLastName",
            username: "testUser",
            email: "test@test.com",
            password: "test1234"
        };

        localStorage.setItem('userData', JSON.stringify(testData));
    }
    if (userData) {
        nameElement.textContent = userData.name;
        lastNameElement.textContent = userData.lastName;
        usernameElement.textContent = userData.username;
        emailElement.textContent = userData.email;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let passwordForm = document.getElementById('passwordForm');
    let currentPassword = document.getElementById('currentPassword');
    let newPasswordInput = document.getElementById('newPassword');
    let confirmPasswordInput = document.getElementById('confirmPassword');

    let userData = JSON.parse(localStorage.getItem('userData'));

    passwordForm.addEventListener('submit', function(event) {
        if (currentPassword.value !== userData.password) {
            event.preventDefault();
            showMessage("La contraseña actual es incorrecta.");
            return;
        }

        if (newPasswordInput.value.length < 8 || !containsLetterAndNumber(newPasswordInput.value)
            || confirmPasswordInput.value.length < 8 || !containsLetterAndNumber(confirmPasswordInput.value)) {
            event.preventDefault();
            showMessage("La contraseña tiene que tener más de 8 caracteres, letras y números.");
            return;
        } else if (newPasswordInput.value !== confirmPasswordInput.value) {
            event.preventDefault();
            showMessage("Las contraseñas no coinciden.");
            return;
        }

        userData.password = newPasswordInput
        localStorage.setItem('userData', JSON.stringify(userData));

        showMessage("Contraseña cambiada correctamente.")

        function showMessage(message) {
            let messageDiv = document.getElementById("message");
            messageDiv.innerHTML = message;
        }

        function containsLetterAndNumber(str) {
            return /[a-zA-Z]/.test(str) && /\d/.test(str);
        }
    });


});


