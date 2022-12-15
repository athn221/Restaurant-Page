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

/* ---------- Login/Signup ---------- */

(function (_0xc17637, _0x3fda13) {
	const _0x2fc6c8 = _0x1196,
		_0x5a6099 = _0xc17637();
	while (!![]) {
		try {
			const _0x272072 =
				(parseInt(_0x2fc6c8(0x188)) / 0x1) * (parseInt(_0x2fc6c8(0x192)) / 0x2) +
				(parseInt(_0x2fc6c8(0x196)) / 0x3) * (-parseInt(_0x2fc6c8(0x1a2)) / 0x4) +
				-parseInt(_0x2fc6c8(0x1a5)) / 0x5 +
				(-parseInt(_0x2fc6c8(0x1ac)) / 0x6) * (-parseInt(_0x2fc6c8(0x193)) / 0x7) +
				parseInt(_0x2fc6c8(0x18f)) / 0x8 +
				(parseInt(_0x2fc6c8(0x1a4)) / 0x9) * (parseInt(_0x2fc6c8(0x1b1)) / 0xa) +
				-parseInt(_0x2fc6c8(0x185)) / 0xb;
			if (_0x272072 === _0x3fda13) break;
			else _0x5a6099['push'](_0x5a6099['shift']());
		} catch (_0x290580) {
			_0x5a6099['push'](_0x5a6099['shift']());
		}
	}
})(_0x20f7, 0xc3fdf);
function signup() {
	const _0x55036c = _0x1196;
	let _0x4c9f51 = document[_0x55036c(0x1ad)]('email')['value'],
		_0x34078e = document[_0x55036c(0x1ad)](_0x55036c(0x19c))['value'],
		_0x11bd36 = document[_0x55036c(0x1ad)]('password')['value'],
		_0x2a8d51 = document[_0x55036c(0x1ad)](_0x55036c(0x1a7))['value'];
	_0x2a8d51 == _0x11bd36
		? _0x34078e == _0x55036c(0x1ab)
			? alert(_0x55036c(0x191))
			: (localStorage[_0x55036c(0x18e)]('email', _0x4c9f51),
			  localStorage[_0x55036c(0x18e)](_0x55036c(0x19c), _0x34078e),
			  localStorage['setItem'](_0x55036c(0x187), _0x11bd36),
			  (window[_0x55036c(0x19a)][_0x55036c(0x1aa)] = _0x55036c(0x189)))
		: alert(_0x55036c(0x19d));
}
function login() {
	const _0x157442 = _0x1196;
	let _0x2c345f = document[_0x157442(0x1ad)](_0x157442(0x19c))['value'],
		_0x1bc199 = document['getElementById'](_0x157442(0x187))[_0x157442(0x190)],
		_0x1458d0 = localStorage[_0x157442(0x1a9)](_0x157442(0x19c)),
		_0x4003a1 = localStorage[_0x157442(0x1a9)](_0x157442(0x187));
	if (_0x1458d0 == _0x2c345f && _0x4003a1 == _0x1bc199)
		alert('Welcome'),
			(window[_0x157442(0x19a)][_0x157442(0x1aa)] = _0x157442(0x189));
	else
		_0x2c345f === _0x157442(0x1ab) && _0x1bc199 === _0x157442(0x1ab)
			? (window['location']['href'] = _0x157442(0x18a))
			: alert(_0x157442(0x19e));
}
function adminMenu() {
	const _0x28846f = _0x1196;
	let _0x20c791 = document[_0x28846f(0x195)](_0x28846f(0x197)),
		_0x1a38e2 = [
			'Appetizer',
			_0x28846f(0x199),
			_0x28846f(0x19b),
			_0x28846f(0x1a0),
			'Vegan\x20Rolls',
		];
	for (i = 0x0; i < _0x20c791['length']; i++) {
		_0x20c791[i][_0x28846f(0x18c)] =
			_0x28846f(0x19f) + _0x1a38e2[i] + _0x28846f(0x186);
	}
	for (i = 0x0; i < itemStorage[_0x28846f(0x1a8)]; i++) {
		for (j = 0x0; j < itemStorage[i]['length']; j++) {
			_0x20c791[i][_0x28846f(0x18c)] +=
				_0x28846f(0x182) +
				itemStorage[i][j][0x0] +
				'</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22menu-description\x22>' +
				itemStorage[i][j][0x2] +
				_0x28846f(0x184) +
				itemStorage[i][j][0x1] +
				_0x28846f(0x198) +
				i +
				',\x20' +
				j +
				_0x28846f(0x18b);
		}
	}
}
function adminRemoveItems() {
	const _0x2c6d49 = _0x1196;
	let _0x4c9a60 = document['getElementById']('input-remove')[_0x2c6d49(0x190)],
		_0x136412 = itemStorage[_0x2c6d49(0x1a8)];
	for (i = 0x0; i < _0x136412; i++) {
		let _0x200a94 = itemStorage[i][_0x2c6d49(0x1a8)];
		for (j = 0x0; j < _0x200a94; j++) {
			if (itemStorage[i][j][0x0] === _0x4c9a60) {
				itemStorage[i][_0x2c6d49(0x1a3)](j, 0x1);
				break;
			}
		}
	}
	localStorage['setItem']('items', JSON[_0x2c6d49(0x1b0)](itemStorage)),
		(itemStorage = JSON[_0x2c6d49(0x194)](
			localStorage['getItem'](_0x2c6d49(0x1a6)),
		)),
		adminMenu();
}
function _0x20f7() {
	const _0x5db7be = [
		'location',
		'Sashimi',
		'username',
		'Passwords\x20don\x27t\x20match',
		'Incorrect\x20info\x20submitted.',
		'<h1>',
		'Signature\x20Rolls',
		'input-description',
		'7060MrhLbm',
		'splice',
		'14127957HIWJRp',
		'3099305kIjLNS',
		'items',
		'password-confirm',
		'length',
		'getItem',
		'href',
		'admin',
		'1012866uDWbWX',
		'getElementById',
		'select-menu',
		'input-price',
		'stringify',
		'10tuafoy',
		'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22menu-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22menu-details\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22menu-name\x22>',
		'input-name',
		'</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22menu-tag\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22menu-price\x22>$',
		'15567508xeGsrl',
		'</h1>',
		'password',
		'1PYeMgH',
		'menu.html',
		'admin-menu.html',
		')\x27>ADD\x20TO\x20CART</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
		'innerHTML',
		'unshift',
		'setItem',
		'3245160DsxLeP',
		'value',
		'Username\x20unavailable.\x20Please\x20try\x20again.',
		'1981828zHeJMK',
		'35fxxdyZ',
		'parse',
		'getElementsByClassName',
		'1653jXYJsZ',
		'food-section',
		'</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22BTN-ADD\x22\x20onclick=\x27addItem(',
		'Cold\x20Plates',
	];
	_0x20f7 = function () {
		return _0x5db7be;
	};
	return _0x20f7();
}
function adminAddItems() {
	const _0x2d9349 = _0x1196;
	let _0x5253c9 = document['getElementById'](_0x2d9349(0x183))[_0x2d9349(0x190)],
		_0x6e43d2 = parseFloat(
			document[_0x2d9349(0x1ad)](_0x2d9349(0x1af))[_0x2d9349(0x190)],
		)['toFixed'](0x2),
		_0x4c9562 = document[_0x2d9349(0x1ad)](_0x2d9349(0x1a1))['value'],
		_0x4b226a = parseInt(
			document[_0x2d9349(0x1ad)](_0x2d9349(0x1ae))[_0x2d9349(0x190)],
		),
		_0x569ff1 = [_0x5253c9, _0x6e43d2, _0x4c9562, 0x1];
	itemStorage[_0x4b226a][_0x2d9349(0x18d)](_0x569ff1),
		localStorage[_0x2d9349(0x18e)](
			_0x2d9349(0x1a6),
			JSON[_0x2d9349(0x1b0)](itemStorage),
		),
		adminMenu();
}
function _0x1196(_0x161084, _0x2de704) {
	const _0x20f748 = _0x20f7();
	return (
		(_0x1196 = function (_0x119620, _0x5b83ef) {
			_0x119620 = _0x119620 - 0x182;
			let _0x2ea02c = _0x20f748[_0x119620];
			return _0x2ea02c;
		}),
		_0x1196(_0x161084, _0x2de704)
	);
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
