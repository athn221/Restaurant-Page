// on page load, do this stuff

$(document).ready(function() {
    togglePaymentMethod();
});


// when the user changes the payment method, do this stuff

let paymentMethod;

$("input[name=payment-method]").change(togglePaymentMethod);

function togglePaymentMethod() {
    paymentMethod = $("input[name=payment-method]:checked").val();
    if (paymentMethod == "card") {
        console.log("card in");
        $(".card-tip").delay(200).fadeIn(200);
        $(".card-info").delay(200).fadeIn(200);
        $(".cash-info").fadeOut(200);
    } else {
        console.log("cash in");
        $(".cash-info").delay(200).fadeIn(200);
        $(".card-info").fadeOut(200);
        $(".card-tip").fadeOut(200);
    }
}