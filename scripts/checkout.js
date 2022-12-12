// on page load, do this stuff
$(document).ready(function() {
    togglePaymentMethod();
});



// when the user changes the payment method, do this stuff
let paymentMethod;

$("input[name=payment-method]").change(togglePaymentMethod);

function togglePaymentMethod() {
    paymentMethod = $("input[name=payment-method]:checked").val();
    if (paymentMethod === "card") {
        $(".card-tip").delay(200).fadeIn(200);
        $(".card-info").delay(200).fadeIn(200);
        $(".cash-info").fadeOut(200);
    } else {
        $(".cash-info").delay(200).fadeIn(200);
        $(".card-info").fadeOut(200);
        $(".card-tip").fadeOut(200);
    }
}



// removing the disabled from other tip field when selected
$("input[name=tip]").change(() => {
    if ($("input[name=tip]:checked").val() === "other") {
        console.log("other selected");
        $("#tip-other").removeAttr("disabled");
    } else {
        console.log("other deselected");
        $("#tip-other").attr("disabled", "disabled");
    }
});



// when the user clicks the submit button, do this stuff
function validateCardForm() {
    let valid = true;
    let cardNumber = $("#card-number").val();
    let cardName = $("#card-name").val();
    let cardExpiration = $("#card-expiration").val();
    let cvv = $("#card-cvv").val();
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        valid = false;
    }
    if (cardName.length < 3) {
        valid = false;
    }
    if (cardExpiration.length !== 4 || isNaN(cardExpiration)) {
        valid = false;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
        valid = false;
    }
    return valid;
}

// TODO not sure all of this is necessary, but will need to store at least card #
function storeCardData() {
    let cardData = {
        cardNumber: $("#card-number").val(),
        cardName: $("#card-name").val(),
        cardExpiration: $("#card-expiration").val(),
        cvv: $("#card-cvv").val()
    }
}


$(".checkout-btn").click(function() {
    if (paymentMethod === "card") {
        if (validateCardForm()) {
            $("#checkout-form").submit(storeCardData());
        } else {
            $("#error-message").fadeIn(200);
        }
    } else {
        $("#checkout-form").submit();
    }
});




