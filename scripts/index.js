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
        <div class="menu-item-container" id="menu-container-id">
            <div class="menu-item">
                <img src="${cartArr[i][2]}" alt="" class="menu-pic">
                <button class="menu-btn">
                    <h3 class="menu-name">${cartArr[i][0]}</h3>
                </button> 
                <span class="menu-price">$${cartArr[i][1]}</span>
                <input class="cart-quantity-input" onchange="changeQuantity()" type="number" value='${cartArr[i][3]}'>
                <button class="BTN-REMOVE" onclick="removeItem(${i})" type="button">REMOVE</button>
            </div>
        </div>
        `
    }
    totalCost()
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

function addItem(item) {
    check = false;
    for (i = 0; i < cartArr.length; i++) {
        if (cartArr[i][0] == itemStorage[item][0]) {
            check = true
        }
    }
    if (check == true) {
        alert("Item is in cart!")
    } else {
        cartArr.push(itemStorage[item])
        console.log(cartArr)
        updateCart()
        alert("Item added")
    }
}

function removeItem(item) {
    //old function that i am nervous about deleting, will clean up later
    // for (i = 0; i < cartArr.length; i++) {
    //     if (cartArr[i][0] == item) {
    //         cartArr.splice(i, 1)
    //         updateCart()
    //         break;
    //     }
    // }   
    cartArr.splice(item,1)
    updateCart()
}

updateCart()



/* ---------- Login Signup ---------- */

function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordconfirm = document.getElementById("password-confirm").value;

    if (passwordconfirm == password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    } else {
        alert("Passwords don't match")
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let usernameCustomer = localStorage.getItem("username");
    let passwordCustomer = localStorage.getItem("password");

    console.log(usernameCustomer)
    console.log(passwordCustomer)

    if (usernameCustomer == username && passwordCustomer == password) {
        alert("test")
        window.location.href = "menu.html"
    } else if (username === "admin" &&  password === "admin") {
        window.location.href = "admin-menu.html"
    } else {
        alert("no")
    }
}


/* ---------- Admin Login ---------- */

// let items = [['burger', 1], ['fry', 50.99, 'images/fry-img.png', 1], ['lemonade', 52.99, 'images/lemonade-img', 1], ['apple', 52.99, 'images/apple-img.png', 1], ['straw', 52.99, 'images/straw-img', 1],['burger', 52.99, 'images/burger-img.png', 1], ['cheese', 12.99, 'images/cheese-img.avif', 1], ['burger with cheese', 52.99, 'images/burger-img.png', 1], ['big burger', 52.99, 'images/burger-img.png', 1]]
// console.log(items)

// localStorage.setItem("items", JSON.stringify(items))

// let itemStorage = JSON.parse(localStorage.getItem("items"))
// console.log(itemStorage)


function adminMenu() {
    let menuContainer = document.getElementById("menu-container-id")
    // menuContainer.innerHTML = ""
    for (i = 0; i < itemStorage.length; i++) {
        menuContainer.innerHTML += `
        <div class="menu-item" id="menu-item-id">
            <h3 class="menu-name">${itemStorage[i][0]}</h3>
            <span class="menu-price">$${itemStorage[i][1]}</span>
            <button class="BTN-ADD" onclick='addItem(${i})' type="button">ADD TO CART</button>
        </div>
        `
    }
}

adminMenu()