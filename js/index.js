// declaring the necessary variables for the website functionality
const productContainers = document.getElementsByClassName("products-container");
const couponApplyBtn = document.getElementById("coupon-apply-button");
const makePurchaseBtn = document.getElementById("purchase-button");
const couponInputField = document.getElementById("coupon-input-field");
const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const goHomeBtn = document.getElementById("go-home");
const cart = document.getElementById("cart-items");
let discountCouponUsed = false;

// adding eventlisteners to the products and setting the product click functionality
for (const productContainer of productContainers) {
  const products = productContainer.getElementsByClassName("product");

  for (const product of products) {
    product.addEventListener("click", function () {
      // getting the product name and also its price
      const productName = this.querySelector(".product-name").innerText;
      const productPriceString = this.querySelector(".product-price").innerText;
      const productPriceNum = numericStringToNumber(
        productPriceString,
        "numericString"
      );

      // getting the previous total price in number data type
      const previousTotalPrice = numericStringToNumber(
        "#total-price",
        "elementSelector"
      );

      // calculating the new total price
      const newTotalPrice = previousTotalPrice + productPriceNum;

      // if new total price is greater than 0 then enable the make purchase button
      if (newTotalPrice > 0) {
        enableElementById("purchase-button");
      }

      // if new total price is equal or greater than 200 than coupon input field and coupon apply button both will be enabled
      if (newTotalPrice >= 200) {
        enableElementById("coupon-input-field");
        enableElementById("coupon-apply-button");
      }

      const newTotalPriceTwoDecimals = toTwoDecimals(newTotalPrice);

      // if the discount hasn't been used then total price and final total will be the same
      if (discountCouponUsed === false) {
        setElementInnerText("#total-price", newTotalPriceTwoDecimals);
        setElementInnerText("#total-final", newTotalPriceTwoDecimals);
      }

      // if the discount has been used then the discount will be calculated based on the accumulating total price and UI data will updated accordingly if more products are added
      if (discountCouponUsed === true) {
        setElementInnerText("#total-price", newTotalPriceTwoDecimals);
        applyDiscount(20);
      }

      // if there is an empty card message element, then remove it and then add the product
      const emptyCardMessage = document.getElementById("empty-cart-message");
      if (emptyCardMessage !== null) {
        cart.removeChild(emptyCardMessage);
      }

      // checking the element count inside the cart element
      count = cart.childElementCount;

      // creating the new li element to be added
      const productItem = document.createElement("li");

      // setting the innerText for the li element
      productItem.innerText = `${count + 1}. ${productName}`;

      // appending the li to the cart parent element
      cart.appendChild(productItem);
    });
  }
}
