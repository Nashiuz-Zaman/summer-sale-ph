//  defining the click handler for the coupon apply button
couponApplyBtn.addEventListener("click", function () {
  if (couponInputField.value !== "SELL200") {
    alert("Please provide a valid coupon code.");
    return;
  }

  if (discountCouponUsed === true) {
    alert("Sorry! You can only use the SELL200 coupon once.");
    return;
  }

  discountCouponUsed = true;
  applyDiscount(20);
  couponInputField.value = "";
});
