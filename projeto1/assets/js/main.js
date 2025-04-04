document.getElementById("toggleMenuBtn").addEventListener("click", function() {
    var menu = document.getElementById("categoriesMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
});