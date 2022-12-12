/* ---------- Cart ---------- */

let cart = document.getElementById('cart');
let isVisible = false;

let cartArr = [];
let totalPrice = 0;
let menuItem = document.getElementsByClassName('menu-item')[0];
let price = document.getElementsByClassName('cart-total-price')[0];
let tax = document.getElementsByClassName('cart-total-tax');

let items = [
  [
    'sushi 1',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 2',
    50.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 3',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 4',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 5',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 6',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 7',
    12.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'sushi 8',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
  [
    'big sushi',
    52.99,
    'A fine piece of sushi with rice and fish wrapped in kelp.',
    1,
  ],
];
if (localStorage.getItem('items') === null) {
  localStorage.setItem('items', JSON.stringify(items));
}

let cartArr = []
let totalPrice = 0
let menuItem = document.getElementsByClassName("menu-item")[0]
let price = document.getElementsByClassName("cart-total-price")[0]
let tax = document.getElementsByClassName("cart-total-tax")

let items = [['sushi 1', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 2', 50.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 3', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 4', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 5', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 6', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 7', 12.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['sushi 8', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1], ['big sushi', 52.99, 'A fine piece of sushi with rice and fish wrapped in kelp.', 1]]
if (localStorage.getItem("items") === null) {
    localStorage.setItem("items", JSON.stringify(items))
}

let itemStorage = JSON.parse(localStorage.getItem("items"))


function shoppingCart() {
  if (isVisible == false) {
    isVisible = true;
    cart.classList.replace('shopping-cart', 'sliding-cart');
  } else if (isVisible == true) {
    isVisible = false;
    cart.classList.replace('sliding-cart', 'shopping-cart');
  }
}

// info for the array for organiziation purposes
// 0 - name
// 1 - price
// 2 - description
// 3 - quantity selector

// info for the array for organiziation purposes
// 0 - name
// 1 - price
// 2 - description
// 3 - quantity selector

function updateCart() {
    menuItem.innerHTML = ""
    totalPrice = 0
    for (i = 0; i < cartArr.length; i++) {
        menuItem.innerHTML += 
        `
        <div class="menu-item">
            <div class="menu-details">
                <h3 class="menu-name">${cartArr[i][0]}</h3>
                <span class="menu-description">${cartArr[i][2]}</span>
            </div>
            <div class="menu-tag">
                <span class="menu-price">$${cartArr[i][1]}</span>
            </div>
            <input class="cart-quantity-input" onchange="changeQuantity()" type="number" value='${cartArr[i][3]}'>
            <button class="BTN-REMOVE" onclick="removeItem(${i})" type="button">REMOVE</button>
        </div>
        `;
  }
  totalCost();
}

function changeQuantity() {
  let cartQuantityInput = document.getElementsByClassName(
    'cart-quantity-input',
  );
  for (i = 0; i < cartQuantityInput.length; i++) {
    if (cartQuantityInput[i].value < 1) {
      cartQuantityInput[i].value = 1;
    }
    let popElement = cartQuantityInput[i].value;
    cartArr[i].pop();
    cartArr[i].push(parseInt(popElement));
  }
  totalPrice = 0;
  totalCost();
}

function totalCost() {
  for (i = 0; i < cartArr.length; i++) {
    let cartPrice = cartArr[i][1] + cartArr[i][1] * 0.06;
    let numberOfItems = cartArr[i][3];
    let finalPrice = cartPrice * numberOfItems;
    totalPrice = finalPrice + totalPrice;
  }
  return (price.innerHTML = '$' + parseFloat(totalPrice).toFixed(2));
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
        updateCart()
        alert("Item added")
    }
}

function removeItem(item) { 
    cartArr.splice(item,1)
    updateCart()
}

updateCart();

/* ---------- Login Signup + Admin Login Signup ---------- */


/* ---------- Login Signup + Admin Login Signup ---------- */


// this is just setting up some login stuff for the email
function signup() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordconfirm = document.getElementById("password-confirm").value;

    if (passwordconfirm == password) {
        if (username == "admin") {
            alert("no")
        } else {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }
        } else {
            alert("Passwords don't match")
        }
}

function login() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

    let usernameCustomer = localStorage.getItem("username");
    let passwordCustomer = localStorage.getItem("password");

    if (usernameCustomer == username && passwordCustomer == password) {
        alert("Nice")
        window.location.href = "menu.html"
    } else if (username === "admin" &&  password === "admin") {
        window.location.href = "admin-menu.html"
    } else { 
        alert("no")
    }
}


/* ---------- Admin Editing Menu---------- */


function adminMenu() {
  let menuContainer = document.getElementById('menu-container-id');
  menuContainer.innerHTML = '';
  for (i = 0; i < itemStorage.length; i++) {
    menuContainer.innerHTML += `

        <div class="menu-item">
            <div class="menu-details">
                <h3 class="menu-name">${itemStorage[i][0]}</h3>
                <span class="menu-description">${itemStorage[i][2]}</span>
            </div>
            <div class="menu-tag">
                <span class="menu-price">$${itemStorage[i][1]}</span>
                <button class="BTN-ADD" onclick='addItem(${i})'>ADD TO CART</button>
            </div>
        </div>
        `;
  }
}

function adminRemoveItems() {
  let itemNameInput = document.getElementById('input-remove').value;
  let length = itemStorage.length;
  for (i = 0; i < length; i++) {
    if (itemStorage[i][0] === itemNameInput) {
      itemStorage.splice(i, 1);
    }

}

function adminRemoveItems() {
    let itemNameInput = document.getElementById("input-remove").value
    let length = itemStorage.length;
    for (i=0;i<length;i++) {
        if (itemStorage[i][0] === itemNameInput) {
            itemStorage.splice(i, 1)
        }
    }
    localStorage.setItem("items", JSON.stringify(itemStorage))
    itemStorage = JSON.parse(localStorage.getItem("items"))
    adminMenu()
}

function adminAddItems() { 
    let inputName = document.getElementById("input-name").value
    let inputPrice = parseInt(document.getElementById("input-price").value)
    let inputDescription = document.getElementById("input-description").value
    let newItemArr = [inputName, inputPrice, inputDescription]

    itemStorage.unshift(newItemArr)
    localStorage.setItem("items", JSON.stringify(itemStorage))
    adminMenu()
}

adminMenu()