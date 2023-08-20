const productContainers = document.getElementsByClassName("products-container");
// const totalPrice = document.getElementById("total-price");
// const discount = document.getElementById("discount");
// const totalFinal = document.getElementById("total-final");
const couponAppyBtn = document.getElementById("coupon-apply-button");
const couponInput = document.getElementById("coupon-input-field");
const makePurchaseBtn = document.getElementById("purchase-button");
const cart = document.getElementById("cart-items");
let discountCouponUsed = false;

function numericStringToNumber(data, dataType) {
  if (dataType === "elementSelector") {
    const element = document.querySelector(data);
    const numberData = parseFloat(element.innerText);

    if (isNaN(numberData)) {
      return "Invalid input. Please check the inner text of the element you are providing.";
    }
    return numberData;
  }

  if (dataType === "text") {
    const numberData = parseFloat(data);

    if (isNaN(numberData)) {
      return "Invalid input. Please check the data you are providing. It must be of number data type or a numeric string";
    }
    return numberData;
  }
}

function setElementInnerText(elementSelector, data) {
  const element = document.querySelector(elementSelector);
  element.innerText = data.toFixed(2);
}

function enableElementById(elementId) {
  const element = document.getElementById(elementId);
  element.removeAttribute("disabled");
}

function applyDiscount() {
  const totalPrice = numericStringToNumber("#total-price", "elementSelector");
  const discount = totalPrice * 0.2;
  const totalFinal = totalPrice - discount;

  setElementInnerText("#discount", discount);
  setElementInnerText("#total-final", totalFinal);
}

for (const productContainer of productContainers) {
  const products = productContainer.getElementsByClassName("product");

  for (const product of products) {
    product.addEventListener("click", function () {
      // getting the product name and its price in number data type
      const productName = this.querySelector(".product-name").innerText;
      const productPriceString = this.querySelector(".product-price").innerText;
      const productPrice = numericStringToNumber(productPriceString, "text");

      // getting the previous total price in number data type
      const previousTotalPrice = numericStringToNumber(
        "#total-price",
        "elementSelector"
      );

      // calculating the new total price
      const newTotalPrice = previousTotalPrice + productPrice;

      // if new total price is greater than 0 then enable the make purchase button
      if (newTotalPrice > 0) {
        enableElementById("purchase-button");
      }

      if (newTotalPrice >= 200) {
        enableElementById("coupon-input-field");
        enableElementById("coupon-apply-button");
      }

      setElementInnerText("#total-price", newTotalPrice);

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

couponAppyBtn.addEventListener("click", function () {
  if (couponInput.value !== "SELL200") {
    alert("Please provide a valid coupon code.");
    return;
  }

  if (discountCouponUsed === true) {
    return;
  }

  discountCouponUsed = true;

  applyDiscount();
});
