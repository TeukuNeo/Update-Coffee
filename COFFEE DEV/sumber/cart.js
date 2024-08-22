
const toggleBtn = document.querySelector(".sidebar-toggle")
const closeBtn = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")

toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar")
})

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar")
})

document.addEventListener('click', function(e) {
    if(!toggleBtn.contains(e.target) && !sidebar.contains(e.target)){
        sidebar.classList.remove('show-sidebar')
    }
})

let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateShopItems = () => {
    if (basket1.length !== 0) {
        return (shoppingCart.innerHTML = basket1.map((x) => {
            console.log(x)
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `
            <div class="cart-item">
             <img width="100" src=${img} alt=""/>
             <div class="details">
             
             <div class="title-price-x">
               <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${price}</p>
               </h4> 
               <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>            
             </div>

             <div class="buttons">
               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
               <div id=${id} class="quantity">${item}</div>
               <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
             </div>

             <h3>$ ${item * search.price}</h3>
             </div>
            </div>`
        }).join(""))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="home.html">
         <button class="HomeBtn">Back to home</button>
        </a>
        `
    }
}
generateShopItems()

let increment = (id) => {
    let selectedItem = id
    let search = basket1.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket1.push({
            id: selectedItem.id,
            Item: 1
        })
    } else {
        search.item += 1
    }
    generateShopItems()
    update(selectedItem.id)
    localStorage.setItem("data1", JSON.stringify(basket1))
}

let decrement = (id) => {

    let selectedItem = id
    let search = basket1.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id)
    basket1 = basket1.filter((x) => x.item !== 0)
    generateShopItems()
    localStorage.setItem("data1", JSON.stringify(basket1))
}

let update = (id) => {
    let search = basket1.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id
    console.log(selectedItem.id)
    basket1 = basket1.filter((x) => x.id !== selectedItem.id)
    generateShopItems()
    calculation()
    totalAmount()
    localStorage.setItem("data1", JSON.stringify(basket1))
}

let clearCart = () => {
    basket1 = []
    calculation()
    generateShopItems()
    localStorage.setItem("data1", JSON.stringify(basket1))
}

let totalAmount = () => {
    if (basket1.length !== 0) {
        let amount = basket1.map((x) => {
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button onclick="checkOutAll(this)" value="pay.html" class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Remove</button>
      `
    }
    else return
}
totalAmount()

function checkOutAll(link){
    console.log(link.value);
    window.location.href = "pay.html";
}