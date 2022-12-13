// on page load, do this stuff
$(document).ready(function() {

    // ensure card options are loaded by default
    togglePaymentMethod();

    // set the default tip to 15%
    $('input[value="15"]').prop('checked', true);
    
    
    // display tip dollar amount next to tip percentage radio buttons
    let checkoutTotal = Number($('.checkout-total').text());

    function displayTipAmount() {
        document.querySelectorAll('input[name=tip]').forEach((e) => {
            let tipPercent = e.getAttribute("value");
            if (tipPercent === "other") {
                return;
            }
            else {
                let tipAmount = checkoutTotal * (tipPercent / 100);
                let tipAmountRounded = tipAmount.toFixed(2);
                e.parentElement.append(` ($${tipAmountRounded})`);
            }
        });
    };
    displayTipAmount();
    
    // call the updateTip function to display the tip amount on page load
    updateTip();
});



// payment method toggle
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



// removing the disabled from "other" tip field when selected
$("input[name=tip]").change(() => {
    if ($("input[name=tip]:checked").val() === "other") {
        $("#tip-other").removeAttr("disabled");
    } else {
        $("#tip-other").attr("disabled", "disabled");
    }
});


// update the tip amount on the checkout form
function updateTip() {
    let tipPercent = $("input[name=tip]:checked").val();
    let tipAmount;
    if (tipPercent === "other") {
        tipAmount = Number($("#tip-other").val());
    } else {
        let checkoutTotal = Number($('.checkout-total').text());
        console.log(checkoutTotal);
        tipAmount = checkoutTotal * (tipPercent / 100);
    }
    console.log(tipAmount)
    let tipAmountRounded = tipAmount.toFixed(2);
    $(".checkout-tip").text(tipAmountRounded);
};

// call the updateTip function when the tip radio buttons are changed
$("input[name=tip]").change(updateTip);

// call the updateTip function when the "#tip-other" input is changed
$("#tip-other").change(updateTip);



// card validation
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


