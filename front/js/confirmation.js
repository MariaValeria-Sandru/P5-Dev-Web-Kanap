
const catchUrl = window.location.search;
const catchOrderId = new URLSearchParams(catchUrl );

const leOrderId = catchOrderId.get("orderId")
console.log(leOrderId);
document.getElementById('orderId').innerHTML = leOrderId;

  