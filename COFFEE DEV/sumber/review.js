
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

let review = document.getElementById("review")

let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateReview = () => {
    return (review.innerHTML = coffeeReviewData.map((x) => {
        let {id, name, desc, img} = x
        return `
    <h2 class="review-heading"> Customer <span>Review</span> </h2>
    <div class="review-container" id="${id}">
     <div class="review-box">
      <img src="gambar/quote.com.png" alt="quote.img" class="quote">
       <pre>${desc}</pre>
      <img src="${img}" alt="" class="review-img"> 
      <h3>${name}</h3>
      <div class="product-stars">
        <i data-feather="star" class="star"></i>
        <i data-feather="star" class="star"></i>
        <i data-feather="star" class="star"></i>
        <i data-feather="star"></i>
        <i data-feather="star"></i>
      </div> 
     </div>
    </div>
    `
    }).join(""))
}
generateReview()

let mode = document.getElementById("dark-mode")

function darkMode() {
    
    review.classList.toggle("darkTheme")
  
    const isDarkMode = about.classList.contains("darkTheme");
    localStorage.setItem("darkMode", isDarkMode);
}

const updateTheme = () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    if (isDarkMode) {
         
        review.classList.toggle("darkTheme")
        
    } else {
       
        review.classList.remove("darkTheme")
        
    }
}
updateTheme()