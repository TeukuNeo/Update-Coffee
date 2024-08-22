
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

document.addEventListener('click', function(e) {
    if(!toggleBtn.contains(e.target) && !sidebar.contains(e.target)){
        sidebar.classList.remove('show-sidebar')
    }
})

let home = document.getElementById("home")
let about = document.getElementById("about")
let shop = document.getElementById("shop")
let promo = document.getElementById("promo")
let review = document.getElementById("review")
let founder = document.getElementById("founder")
let blog = document.getElementById("blog")
let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateBlog = () => {
    return (blog.innerHTML = coffeeBlogData.map((x) => {
        let { id, title, date, desc, img } = x
        return `
        <h2 class="blog-title1"><span>Blog</span> Kami</h2>
        <div class="blog-container" id="${id}">
            <div class="blog-box">
                <div class="blog-img">
                    <img src="${img}" alt="">
                </div>
                <div class="blog-content">
                    <a href="#" class="blog-title">${title}</a>
                    <span>${date}</span>
                    <pre>${desc}</pre>
                    <a href="" class="blog-btn">read more</a>
                </div>
            </div>
        </div>
        `
    }).join(""))
}
generateBlog()

let mode = document.getElementById("dark-mode")

function darkMode() {
    about.classList.toggle("darkTheme")
    shop.classList.toggle("darkTheme")
    founder.classList.toggle("darkTheme")
    review.classList.toggle("darkTheme")
    blog.classList.toggle("darkTheme")
    const isDarkMode = about.classList.contains("darkTheme");
    localStorage.setItem("darkMode", isDarkMode);
}

const updateTheme = () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    if (isDarkMode) {
        about.classList.toggle("darkTheme")
        shop.classList.toggle("darkTheme") 
        founder.classList.toggle("darkTheme")   
        review.classList.toggle("darkTheme")
        blog.classList.toggle("darkTheme")
    } else {
        about.classList.remove("darkTheme")
        shop.classList.remove("darkTheme")
        review.classList.remove("darkTheme")
        blog.classList.remove("darkTheme")
    }
}
updateTheme()