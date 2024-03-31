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

