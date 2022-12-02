/* ---------- Cart ---------- */

let cart = document.getElementById("cart")
let isVisible = false

let cartArr = []
let totalPrice = 0
let menuItem = document.getElementsByClassName("menu-item")[0]
let price = document.getElementsByClassName("cart-total-price")[0]
let tax = document.getElementsByClassName("cart-total-tax")

function shoppingCart() {
    if (isVisible == false) {
        isVisible = true
        cart.classList.replace("shopping-cart", "sliding-cart")
    } else if (isVisible == true) {
        isVisible = false
        cart.classList.replace("sliding-cart","shopping-cart")
    }
}

function updateCart() {
    menuItem.innerHTML = ""
    totalPrice = 0
    for (i = 0; i < cartArr.length; i++) {
        menuItem.innerHTML += `
        <div class="menu-item-container">
            <div class="menu-item">
                <img src="${cartArr[i][2]}" alt="" class="menu-pic">
                <button class="menu-btn">
                    <h3 class="menu-name">${cartArr[i][0]}</h3>
                </button> 
                <span class="menu-price">$${cartArr[i][1]}</span>
                <input class="cart-quantity-input" onchange="changeQuantity()" type="number" value='${cartArr[i][3]}'>
                <button class="BTN-REMOVE" onclick="removeItem('${cartArr[i][0]}')" type="button">REMOVE</button>
            </div>
        </div>
        `
    }
    totalCost()
}


//this is where we do the receipt thing
function clickPurchase() {
    alert('Thank you for your purchase!')
    let menuItem = document.getElementsByClassName('menu-item')[0]
    while (menuItem.hasChildNodes()) {
        menuItem.removeChild(menuItem.firstChild)
    }
    cartArr = [];
    totalPrice = 0;
    totalCost();
}

function changeQuantity() {
    let cartQuantityInput = document.getElementsByClassName("cart-quantity-input")
    for (i = 0; i < cartQuantityInput.length; i++) {
        if (cartQuantityInput[i].value < 1) {
            cartQuantityInput[i].value = 1
        }
        let popElement = cartQuantityInput[i].value
        cartArr[i].pop()
        cartArr[i].push(parseInt(popElement))
    }
    totalPrice = 0
    totalCost()
}

function totalCost() {
    for (i = 0; i < cartArr.length; i++) {
        let cartPrice = cartArr[i][1] + cartArr[i][1]*.06
        let numberOfItems = cartArr[i][3]
        let finalPrice = cartPrice*numberOfItems
        totalPrice = finalPrice + totalPrice
    }
    return price.innerHTML = "$" + parseFloat(totalPrice).toFixed(2)
}

// function totalTax() {
//     for (i = 0; i < cartArr.length; i++) {
//         let taxPrice = cartArr[i][1]*.06
//     }
//     return tax.innerHTML = "$" + parseFloat(taxPrice).toFixed(2)
// }

function addItem(arr) {
    check = false;
    for (i = 0; i < cartArr.length; i++) {
        if (cartArr[i][0] == arr[0]) {
            check = true
        }
    }
    if (check == true) {
        alert("Item is in cart!")
    } else {
        cartArr.push(arr)
        updateCart()
    }
}

function removeItem(item) {
    for (i = 0; i < cartArr.length; i++) {
        if (cartArr[i][0] == item) {
            cartArr.splice(i, 1)
            updateCart()
            break;
        }
    }   
}



updateCart()