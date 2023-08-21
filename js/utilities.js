// function to get number data type from an element's innertext or from a numeric string
function numericStringToNumber(data, dataType) {
  //  if an element selector string is passed then this code executes
  if (dataType === "elementSelector") {
    const element = document.querySelector(data);
    const numberData = parseFloat(element.innerText);

    // validation
    if (isNaN(numberData)) {
      alert(
        "Invalid input. Please check the inner text of the element you are providing."
      );
      return;
    }
    return numberData;
  }

  //  if a numeric string is directly passed then this code executes
  if (dataType === "numericString") {
    const numberData = parseFloat(data);

    // validation
    if (isNaN(numberData)) {
      alert(
        "Invalid input. Please check the data you are providing. It must be of number data type or a numeric string"
      );
      return;
    }
    return numberData;
  }
}

// convert number to two decimals numeric string
function toTwoDecimals(data) {
  // validation
  if (typeof data !== "number") {
    alert("Invalid data. Data must be of number type.");
  }

  return data.toFixed(2);
}

//  function for setting the innertext of an element
function setElementInnerText(elementSelector, data) {
  const element = document.querySelector(elementSelector);
  element.innerText = data;
}

// function to remove disable attribute from an element such as input fields or buttons
function enableElementById(elementId) {
  // validation
  if (typeof elementId !== "string") {
    alert("Please provide an HTML element's ID as string data type.");
    return;
  }

  const element = document.getElementById(elementId);
  element.removeAttribute("disabled");
}

// function to add the disabled attribute to an element such as input fields or buttons
function disableElementById(elementId) {
  // validation
  if (typeof elementId !== "string") {
    alert("Please provide an HTML element's ID as string data type.");
    return;
  }

  const element = document.getElementById(elementId);
  element.setAttribute("disabled", true);
}

// function for applying the discount to the shopping cart and update UI data accordingly
function applyDiscount(discountPercentage) {
  // validation
  if (typeof discountPercentage !== "number") {
    alert(
      "Please provide a number type for the discount percentage parameter."
    );
    return;
  }

  const totalPrice = numericStringToNumber("#total-price", "elementSelector");
  const discount = totalPrice * (discountPercentage / 100);
  const totalFinal = totalPrice - discount;

  const discountToTwoDecimals = toTwoDecimals(discount);
  const totalFinalToTwoDecimals = toTwoDecimals(totalFinal);

  setElementInnerText("#discount", discountToTwoDecimals);
  setElementInnerText("#total-final", totalFinalToTwoDecimals);
}

// function for creating the empty card message element
function createEmptyCartMessage() {
  const emptyCardMessage = document.createElement("p");
  emptyCardMessage.classList.add(
    "text-center",
    "text-gray-400",
    "leading-[inherit]"
  );
  emptyCardMessage.setAttribute("id", "empty-cart-message");
  emptyCardMessage.innerText = "Cart is empty";

  cart.appendChild(emptyCardMessage);
}
