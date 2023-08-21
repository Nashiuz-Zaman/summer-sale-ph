//  adding click handler to the go home button
goHomeBtn.addEventListener("click", function () {
  backdrop.classList.remove("!opacity-100", "!visible");
  modal.classList.remove("!opacity-100", "!visible");

  disableElementById("purchase-button");
  disableElementById("coupon-input-field");
  disableElementById("coupon-apply-button");
  discountCouponUsed = false;

  cart.innerHTML = "";
  createEmptyCartMessage();

  setElementInnerText("#total-price", "0.00");
  setElementInnerText("#discount", "0.00");
  setElementInnerText("#total-final", "0.00");
});
