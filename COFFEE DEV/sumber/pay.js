
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

let items = document.getElementById("item-section")
let label = document.getElementById("label")
let total = document.getElementById("totalPayment")
let basket1 = JSON.parse(localStorage.getItem("data1")) || []

let calculation = () => {
}

let generatePayItems = () => {
    if (basket1.length !== 0) {
        return (items.innerHTML = basket1.map((x) => {
            console.log(x)
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `      
         <div class="item">
           <img src=${img} alt="">
            <div class="info">
              <h4>${name}</h4>
              <p>Price:$ ${price}</p>
              <p id="${id}" >Total: ${item}</p>
           </div>
          <div class="price">
             <a href="#" class="remove">x</a>
          </div>
         </div>  
        `
        }).join(""))
    }
}
generatePayItems()

let payItemTotalAmount = () => {
    if (basket1.length !== 0) {
        let amount = basket1.map((x) => {
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
          <div class="total">
            Subtotal:
            <span>$ ${amount}</span>
          </div>
        `
    } else return
}
payItemTotalAmount()

let finalPayItemTotalAmount = () => {
    if (basket1.length !== 0) {
        let amount = basket1.map((x) => {
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        total.innerHTML = `
          <div class="total">
                    Total payment:
                <span>$ ${amount}</span>
          </div>
        `
    }
}
finalPayItemTotalAmount()