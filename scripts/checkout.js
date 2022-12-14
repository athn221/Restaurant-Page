// on page load, do this stuff
$(document).ready(function () {
	displayCartItems();
	// ensure card options are loaded by default
	togglePaymentMethod();

	// set the default tip to 15%
	$('input[value="15"]').prop('checked', true);

	// display tip dollar amount next to tip percentage radio buttons
	let checkoutTotal = Number($('.checkout-subtotal').text()) + Number($('.checkout-tax').text());

	function displayTipAmount() {
		document.querySelectorAll('input[name=tip]').forEach((e) => {
			let tipPercent = e.getAttribute('value');
			if (tipPercent === 'other') {
				return;
			} else {
				let tipAmount = checkoutTotal * (tipPercent / 100);
				let tipAmountRounded = tipAmount.toFixed(2);
				e.parentElement.append(` ($${tipAmountRounded})`);
			}
		});
	}
	displayTipAmount();

	// call the updateTip function to display the tip amount on page load
	updateTip();
});

// payment method toggle
let paymentMethod;

$('input[name=payment-method]').change(togglePaymentMethod);

function togglePaymentMethod() {
	paymentMethod = $('input[name=payment-method]:checked').val();
	if (paymentMethod === 'card') {
		$('.card-tip').delay(200).fadeIn(200);
		$('.card-info').delay(200).fadeIn(200);
		$('.cash-info').fadeOut(200);
	} else {
		$('.cash-info').delay(200).fadeIn(200);
		$('.card-info').fadeOut(200);
		$('.card-tip').fadeOut(200);
	}
}

// removing the disabled from "other" tip field when selected
$('input[name=tip]').change(() => {
	if ($('input[name=tip]:checked').val() === 'other') {
		$('#tip-other').removeAttr('disabled');
	} else {
		$('#tip-other').attr('disabled', 'disabled');
	}
});

// update the tip amount on the checkout form
function updateTip() {
	let tipPercent = $('input[name=tip]:checked').val();
	let tipAmount;
	console.log(tipPercent)
	if (tipPercent === 'other') {
		tipAmount = Number($('#tip-other').val());
	} else {
		// tip amount from subtotal + tax
		let checkoutTotal = Number($('.checkout-subtotal').text()) + Number($('.checkout-tax').text());
		tipAmount = checkoutTotal * (tipPercent / 100);
	}
	console.log(tipAmount);
	let tipAmountRounded = tipAmount.toFixed(2);
	$('.checkout-tip').text(tipAmountRounded);
}

// call the updateTip function when the tip radio buttons are changed
$('input[name=tip]').change(updateTip);
// call the updateTip function when the "#tip-other" input is changed
$('#tip-other').change(updateTip);

// card validation
function validateCardForm() {
	let cardNumber = $('#card-number').val();
	let cardName = $('#card-name').val();
	let cardExpiration = $('#card-expiration').val();
	let cvv = $('#card-cvv').val();
	if (cardNumber.length !== 16 || isNaN(cardNumber)) {
		return false;
	} else if (cardName.length < 3) {
		valid = false;
	} else if (cardExpiration.length !== 4 || isNaN(cardExpiration)) {
		valid = false;
	} else if (cvv.length !== 3 || isNaN(cvv)) {
		valid = false;
	} else return true;
}

// ? not sure all of this is necessary, but will need to store at least card # for receipt
function storeCardData() {
	let cardData = {
		cardNumber: $('#card-number').val(),
		cardName: $('#card-name').val(),
		cardExpiration: $('#card-expiration').val(),
		cvv: $('#card-cvv').val(),
	};
}

$('.checkout-btn').click(function () {
	if (paymentMethod === 'card') {
		if (validateCardForm()) {
			$('#checkout-form').submit(storeCardData());
			checkoutTime();
			toOrderComplete();
		} else {
			console.log('error');
		}
	} else {
		$('#checkout-form').submit();
	}
});

// keep track of the time a user has taken to successfully checkout
// * this outputs in milliseconds, so divide by 1000 to get seconds
const start = new Date();

function checkoutTime() {
	const end = new Date();
	const time = end - start;
	localStorage.setItem('checkoutTime', time);
}

// display the cart items in the ".cart-contents" div
function displayCartItems() {
	let cartItems = JSON.parse(localStorage.getItem('cart'));

	for (let i = 0; i < cartItems.length; i++) {
		let cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
		cartItem.innerHTML = cartItems[i][0];
		cartItem.innerHTML += ` $${cartItems[i][1]}`;
		cartItem.innerHTML += ` x${cartItems[i][3]}`;
		$('.cart-contents').append(cartItem);
	}
	calculateTotals();
}



// calculate the subtotal, tax, tip and total
function calculateTotals() {
	let cartItems = JSON.parse(localStorage.getItem('cart'));

	// calculate the subtotal
	let subtotal = 0;
	for (let i = 0; i < cartItems.length; i++) {
		subtotal += cartItems[i][1] * cartItems[i][3];
	}
	// display the subtotal, tax and total
	$('.checkout-subtotal').text(subtotal.toFixed(2));

	let tax = subtotal * 0.06;
	$('.checkout-tax').text(tax.toFixed(2));

	let tip = Number($('.checkout-tip').text());
	let total = subtotal + tax + tip;
	$('.checkout-total').text(total.toFixed(2));
}

// call the calculateTotals function when the tip radio buttons are changed
$('input[name=tip]').change(calculateTotals);
// call the calculateTotals function when the "#tip-other" input is changed
$('#tip-other').change(calculateTotals);

function toOrderComplete() {
	// store the card info, subtotal, tax, tip and total in local storage
	let cardInfo = {
		cardNumber: $('#card-number').val(),
		cardName: $('#card-name').val(),
		cardExpiration: $('#card-expiration').val(),
		cvv: $('#card-cvv').val(),
	};
	localStorage.setItem('cardInfo', JSON.stringify(cardInfo));
	localStorage.setItem('subtotal', $('.checkout-subtotal').text());
	localStorage.setItem('tax', $('.checkout-tax').text());
	localStorage.setItem('tip', $('.checkout-tip').text());
	localStorage.setItem('total', $('.checkout-total').text());
	// store the payment method, date and time in local storage
	localStorage.setItem('paymentMethod', paymentMethod);
	let date = new Date();
	localStorage.setItem('date', date.toLocaleDateString());
	localStorage.setItem('time', date.toLocaleTimeString());

	window.location.href = 'order-complete.html';
  }