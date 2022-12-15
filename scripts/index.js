/* ---------- On Doc Load ---------- */
$(document).ready(function () {
	// if there isn't a menu in local storage, create one
	if (localStorage.getItem('items') === null) {
		localStorage.setItem('items', JSON.stringify(items));
	}
});

/* ---------- Cart ---------- */

// cart variables
let cart = document.getElementById('cart');
let isVisible = false;

let cartArr = [];
let totalPrice = 0;
let menuItem = document.getElementsByClassName('menu-item')[0];
let price = document.getElementsByClassName('cart-total-price')[0];
let tax = document.getElementsByClassName('cart-total-tax');

// populate menu
let items = [
	[
		[
			'Edamame',
			5.99,
			'Steamed young soybeans in pods, lightly seasoned with a pinch of salt. A subtle nutty flavor with a soft, firm bite texture.',
			1,
			'appetizer',
		],
		[
			'Scallion Pancakes',
			7.99,
			'A pancake made with scallions. Chewy, flaky, and savory.',
			1,
			'appetizer',
		],
		[
			'Shrimp Tempura',
			8.99,
			'A light, crispy coating. Lightly battered and deep fried shrimp.',
			1,
			'appetizer',
		],
		[
			'Vegetable Tempura',
			8.99,
			'A light, crispy coating. Lightly battered and deep fried sweet potato.',
			1,
			'appetizer',
		],
		['Soup', 5.99, 'Miso or Clear Soup.', 1, 'appetizer'],
	],
	[
		[
			'Kani Salad',
			6.99,
			'Shredded crab sticks with Japanese mayonnaise (Kewpie) and siracha. The salad is tossed with tobiko and panko breadcrumbs.',
			1,
			'cold-plates',
		],
		[
			'Seaweed Salad',
			6.99,
			'Wakame seaweed mixed with sesame seeds, vinegar, and sesame oil.',
			1,
			'cold-plates',
		],
		[
			'Avocado Salad',
			8.99,
			'Sliced avocado is topped with a bright dressing of rice vinegar, soy sauce, and sesame oil.',
			1,
			'cold-plates',
		],
		[
			'Ahi Tuna Nachos',
			12.99,
			'Made with seared sesame seed crusted tuna, deep-fried wonton pieces, and other toppings.',
			1,
			'cold-plates',
		],
		[
			'Cold Sesame Noodles',
			7.99,
			'Sweet and savory richly flavored sauce on top of thick egg noodle with crunchy peanuts and sesame seeds.',
			1,
			'cold-plates',
		],
	],
	[
		['Salmon', 2.99, '2 pcs', 1, 'sashimi'],
		['Spanish Mackeral', 2.99, '2 pcs', 1, 'sashimi'],
		['Eel', 2.99, '2 pcs', 1, 'sashimi'],
		['White Tuna', 2.99, '2 pcs', 1, 'sashimi'],
		['Yellow Tail', 2.99, '2 pcs', 1, 'sashimi'],
	],
	[
		[
			'Salmon Squared Rolls',
			13.99,
			'Salmon tempura roll with Salmon on top.',
			1,
			'rolls',
		],
		[
			'Spicier Tuna Roll',
			10.99,
			'Traditional Spicy Tuna Roll with cucumber, avocado, and jalapeño pepper.',
			1,
			'rolls',
		],
		[
			'Lemon Roll',
			14.99,
			'Spicy krab, avocado, cucumber. On top: Salmon with thin lemon slices, cilantro, sriracha sauce, ponzu sauce.',
			1,
			'rolls',
		],
		[
			'Corn Roll',
			15.99,
			'A fine piece of sushi with rice and corn wrapped in kelp.',
			1,
			'rolls',
		],
		[
			'House Special Roll',
			18.99,
			'Spicy Tuna, Salmon, with tobiko and kani.',
			1,
			'rolls',
		],
	],
	[
		[
			'Fried Tofu Roll',
			6.99,
			'A fine piece of sushi with rice and tofu wrapped in kelp.',
			1,
			'vegan-rolls',
		],
		[
			'Tofu Lemongrass Roll',
			9.99,
			'A fine piece of sushi with rice and tofu and peanutbutter wrapped in kelp. Topped with peanuts.',
			1,
			'vegan-rolls',
		],
		[
			'Peanut Tofu Roll',
			8.99,
			'A fine piece of sushi with rice and tofu and peanutbutter wrapped in kelp. Topped with peanuts.',
			1,
			'vegan-rolls',
		],
		[
			'Kani Roll',
			11.99,
			'A fine piece of sushi with rice and kani wrapped in kelp. Topped with tobiko.',
			1,
			'vegan-rolls',
		],
		[
			'California Roll',
			6.99,
			'A fine piece of sushi with crab and avocado wrapped in kelp and rice.',
			1,
			'vegan-rolls',
		],
	],
];

if (localStorage.getItem('items') === null) {
	localStorage.setItem('items', JSON.stringify(items));
}

let itemStorage = JSON.parse(localStorage.getItem('items'));

// toggle cart visibility
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

function updateCart() {
	menuItem.innerHTML = '';
	totalPrice = 0;
	for (i = 0; i < cartArr.length; i++) {
		menuItem.innerHTML += `
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

// when the quantity is changed, make sure it is not less than 1 and get the cart array from local storage, then update the quantity in the array and then update the cart
function changeQuantity() {
	let cartQuantityInput = document.getElementsByClassName('cart-quantity-input');
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

// calculating the total cost of the cart
function totalCost() {
	for (i = 0; i < cartArr.length; i++) {
		let cartPrice = cartArr[i][1] + cartArr[i][1] * 0.06;
		let numberOfItems = cartArr[i][3];
		let finalPrice = cartPrice * numberOfItems;
		totalPrice = finalPrice + totalPrice;
	}
	return (price.innerHTML = '$' + parseFloat(totalPrice).toFixed(2));
}

function addItem(category, item) {
	check = false;
	for (i = 0; i < cartArr.length; i++) {
		for (j = 0; j < itemStorage[i].length; j++) {
			if (cartArr[i][0] == itemStorage[category][item][0]) {
				check = true;
			}
		}
	}
	if (check == true) {
		alert('Item is in cart!');
	} else {
		cartArr.push(itemStorage[category][item]);
		updateCart();
		alert('Item added');
	}
}

// remove items from the cart (okay this is a little obvious)
function removeItem(item) {
	cartArr.splice(item, 1);
	updateCart();
}

updateCart();



/* ---------- Login Signup + Admin Login Signup ---------- */

function signup() {
	let email = document.getElementById('email').value;
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	let passwordconfirm = document.getElementById('password-confirm').value;

	if (passwordconfirm == password) {
		if (username == 'admin') {
			alert('Username unavailable. Please try again.');
		} else {
			localStorage.setItem('email', email);
			localStorage.setItem('username', username);
			localStorage.setItem('password', password);
			window.location.href = 'menu.html';
		}
	} else {
		alert("Passwords don't match");
	}
}

// verifying the login username and password
// TODO - email login
// TODO - change how the user info is stored in local storage
function login() {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	let usernameCustomer = localStorage.getItem('username');
	let passwordCustomer = localStorage.getItem('password');

	if (usernameCustomer == username && passwordCustomer == password) {
		alert('Welcome');
		window.location.href = 'menu.html';
	} else if (username === 'admin' && password === 'admin') {
		window.location.href = 'admin-menu.html';
	} else {
		alert('Incorrect info submitted.');
	}
}



/* ---------- Admin Controls ---------- */

// building out the admin's menu
function adminMenu() {
	let foodSection = document.getElementsByClassName('food-section');
	let categories = [
		'Appetizer',
		'Cold Plates',
		'Sashimi',
		'Signature Rolls',
		'Vegan Rolls',
	];
	for (i = 0; i < foodSection.length; i++) {
		foodSection[i].innerHTML = `<h1>${categories[i]}</h1>`;
	}
	for (i = 0; i < itemStorage.length; i++) {
		for (j = 0; j < itemStorage[i].length; j++) {
			foodSection[i].innerHTML += `

        <div class="menu-item">
            <div class="menu-details">
                <h3 class="menu-name">${itemStorage[i][j][0]}</h3>
                <span class="menu-description">${itemStorage[i][j][2]}</span>
            </div>
            <div class="menu-tag">
                <span class="menu-price">$${itemStorage[i][j][1]}</span>
                <button class="BTN-ADD" onclick='addItem(${i}, ${j})'>ADD TO CART</button>
            </div>
        </div>
        `;
		}
	}
}

// remove items from the menu
function adminRemoveItems() {
	let itemNameInput = document.getElementById('input-remove').value;
	let length = itemStorage.length;
	for (i = 0; i < length; i++) {
		let categoryLength = itemStorage[i].length;
		for (j = 0; j < categoryLength; j++) {
			if (itemStorage[i][j][0] === itemNameInput) {
				itemStorage[i].splice(j, 1);
				break;
			}
		}
	}
	localStorage.setItem('items', JSON.stringify(itemStorage));
	itemStorage = JSON.parse(localStorage.getItem('items'));
	adminMenu();
}

// add items to the menu
function adminAddItems() {
	let inputName = document.getElementById('input-name').value;
	let inputPrice = parseFloat(document.getElementById('input-price').value).toFixed(2);
	let inputDescription = document.getElementById('input-description').value;
	let selectMenu = parseInt(document.getElementById('select-menu').value);
	let newItemArr = [inputName, inputPrice, inputDescription, 1];

	itemStorage[selectMenu].unshift(newItemArr);
	localStorage.setItem('items', JSON.stringify(itemStorage));
	adminMenu();
}

adminMenu();



/* ---------- Checkout ---------- */

function toCheckout() {
	//if there isn't a cart in local storage, create one
	if (localStorage.getItem('cart') === null) {
		localStorage.setItem('cart', JSON.stringify(cartArr));
	}
	//if there is a cart in local storage, update it
	else {
		localStorage.setItem('cart', JSON.stringify(cartArr));
	}
	window.location.href = 'checkout.html';
}