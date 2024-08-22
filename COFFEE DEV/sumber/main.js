
const toggleBtn = document.querySelector(".sidebar-toggle")
const closeBtn = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")


toggleBtn.addEventListener("click", function (e) {
    sidebar.classList.toggle("show-sidebar")
    sidebar.focus()
    e.preventDefault()
})

closeBtn.addEventListener("click", function (e) {
    sidebar.classList.remove("show-sidebar")
    sidebar.focus()
    e.preventDefault()
})

document.addEventListener("click", function(e){
    if (!toggleBtn.contains(e.target) && !sidebar.contains(e.target)){
        sidebar.classList.remove('show-sidebar')
    }
})

const qualityModalClose = document.querySelectorAll(".quality-close-modal")
const qualityBoxes = document.querySelectorAll(".quality-content");
const qualityModal = document.querySelector(".qualityOverlay");

qualityBoxes.forEach(qualityBox => {
    qualityBox.addEventListener("click", function (e) {
        qualityModal.classList.add("quality-open-modal");
        qualityModal.focus();
        e.preventDefault();
    });
});

qualityModalClose.forEach(qualityCloseButton => {
    qualityCloseButton.addEventListener("click", function (e) {
        qualityModal.classList.remove("quality-open-modal");
        qualityModal.focus();
        e.preventDefault();
    });
})

let home = document.getElementById("home")
let about = document.getElementById("about")
let founder = document.getElementById("founder")

let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let mode = document.getElementById("dark-mode")

function darkMode() {
    about.classList.toggle("darkTheme")
    founder.classList.toggle("darkTheme")
    const isDarkMode = about.classList.contains("darkTheme");
    localStorage.setItem("darkMode", isDarkMode);
}

const updateTheme = () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    if (isDarkMode) {
        about.classList.toggle("darkTheme")
        founder.classList.toggle("darkTheme")
    } else {
        about.classList.remove("darkTheme")
    }
}
updateTheme()








