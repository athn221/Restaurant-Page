/* ---------- Cart ---------- */

function shoppingCart() {
    if (isVisible == false) {
        isVisible = true
        cart.classList.replace("shopping-cart", "sliding-cart")
    } else if (isVisible == true) {
        isVisible = false
        cart.classList.replace("sliding-cart","shopping-cart")
    }
}
