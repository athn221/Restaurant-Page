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
    let cardNumber = $("#card-number").val();
    let cardName = $("#card-name").val();
    let cardExpiration = $("#card-expiration").val();
    let cvv = $("#card-cvv").val();
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        return false;
    }
    else if (cardName.length < 3) {
        valid = false;
    }
    else if (cardExpiration.length !== 4 || isNaN(cardExpiration)) {
        valid = false;
    }
    else if (cvv.length !== 3 || isNaN(cvv)) {
        valid = false;
    }
    else return true;
};


// ? not sure all of this is necessary, but will need to store at least card # for receipt
function storeCardData() {
    let cardData = {
        cardNumber: $("#card-number").val(),
        cardName: $("#card-name").val(),
        cardExpiration: $("#card-expiration").val(),
        cvv: $("#card-cvv").val()
    };
};


$(".checkout-btn").click(function() {
    if (paymentMethod === "card") {
        if (validateCardForm()) {
            $("#checkout-form").submit(storeCardData());
            checkoutTime();
        } else {
            console.log('error');
        }
    } else {
        $("#checkout-form").submit();
    }
});



// keep track of the time a user has taken to successfully checkout
// * this outputs in milliseconds, so divide by 1000 to get seconds
const start = new Date();

function checkoutTime() {
    const end = new Date();
    const time = end - start;
    console.log(time);
}
