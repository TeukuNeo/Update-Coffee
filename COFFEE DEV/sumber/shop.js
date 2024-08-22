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

let shop = document.getElementById("shop")

let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

//SHOP CODE

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket1.find((x) => x.id === id) || { item: 0 }
        return `
        <h2 class="menu-title"><span>Menu</span> Kami</h2>
        <div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
             <h3>${name}</h3>
             <p>${desc}</p>
             <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
             </div>
            </div>
        </div>`
    }).join(""))
}
generateShop()

let increment = (id) => {
    let selectedItem = id
    let search = basket1.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket1.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1
    }
    update(selectedItem.id)
    localStorage.setItem("data1", JSON.stringify(basket1))
    calculation()
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket1.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1
    }
    update(selectedItem.id)
    basket1 = basket1.filter((x) => x.item !== 0)
    localStorage.setItem("data1", JSON.stringify(basket1))
    calculation()
}

let update = (id) => {
    let search = basket1.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
}

let mode = document.getElementById("dark-mode")

function darkMode() {
    shop.classList.toggle("darkTheme")  
    const isDarkMode = about.classList.contains("darkTheme");
    localStorage.setItem("darkMode", isDarkMode);
}

const updateTheme = () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    if (isDarkMode) {
        shop.classList.toggle("darkTheme")      
    } else {
        shop.classList.remove("darkTheme")     
    }
}
updateTheme()