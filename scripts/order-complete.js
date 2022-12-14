// variables for the data from local storage
let date = localStorage.getItem('date');
let time = localStorage.getItem('time');
let checkoutTime = localStorage.getItem('checkoutTime');
let minutes = Math.floor(checkoutTime / 60000);
let seconds = ((checkoutTime % 60000) / 1000).toFixed(0);
let cardInfo = JSON.parse(localStorage.getItem('cardInfo'));
let paymentMethod = localStorage.getItem('paymentMethod');

// display the date, time, the checkout time, the customer name, and the payment method  
$('.receipt-date').text(date);
$('.receipt-time').text(time);
$('.receipt-checkout-time').text(`${minutes}:${seconds}`);
$('.receipt-name').text(cardInfo.cardName);
$('.receipt-payment-method').text(paymentMethod);


// if the payment method is card, show the last 4 digits of the card number
if (paymentMethod === 'card') {
    let cardNumber = cardInfo.cardNumber;
    let last4 = cardNumber.slice(-4);
    let cardNumberElement = document.createElement('span');
    cardNumberElement.classList.add('receipt-card-number');
    cardNumberElement.innerHTML = ` ending in ${last4}`;
    $('.receipt-payment-method').after(cardNumberElement);
} else {
    let cashPayment = document.createElement('span');
    cashPayment.classList.add('receipt-cash-payment');
    cashPayment.innerHTML = ' cash payment';
    $('.receipt-payment-method').after(cashPayment);
}

// display the name, quantity and cost of the cart items
let cartItems = JSON.parse(localStorage.getItem('cart'));
for (let i = 0; i < cartItems.length; i++) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('receipt-item');
    cartItem.innerHTML = `${cartItems[i][0]} x${cartItems[i][3]} $${cartItems[i][1]}`;
    $('.receipt-items-purchased').append(cartItem);
}


// display the subtotal, tax, tip and total
$('.receipt-subtotal').text(localStorage.getItem('subtotal'));
$('.receipt-tax').text(localStorage.getItem('tax'));
$('.receipt-tip').text(localStorage.getItem('tip'));
$('.receipt-total').text(localStorage.getItem('total'));
