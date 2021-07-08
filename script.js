var name_input = document.getElementById("name");
var email_input = document.getElementById("email");
var skype_input = document.getElementById("skype");
var bhw_input = document.getElementById("bhw");
var package_checkboxes = document.getElementsByClassName("form-check-input");
var checkbox_alert = document.getElementById("checkbox-alert");
var total_div = document.getElementById("total-value");
var coupon_code_input = document.getElementById("coupon-code");
var coupon_code_alert = document.getElementById("coupon-code-alert");
var keyword_input = document.getElementById("keyword-url");
let total_amount = 0;
let discount_amount = 0;
let discounted_amount = 0;
let packages = [];
let error = [];
let COUPON_CODE = "none";
total_div.innerHTML = "Total Amount: $";
// const sandboxAPI = config.SANDBOX_API_TOKEN;
// const productionAPI = config.PRODUCTION_API_KEY;

// initialize emailjs
(function () {
  emailjs.init("user_Q6KRx6fcb3m11UA94gxn7");
})();

// check and display the total amount of the packages selected
function total(id) {
  var checkbox = document.getElementById(id);
  if (checkbox.checked) {
    total_amount = total_amount + parseInt(checkbox.value);
    if (checkbox.value == 18) {
      packages.push("1 post at $18");
    } else if (checkbox.value == 85) {
      packages.push("5 posts at $85");
    } else {
      packages.push("10 posts at $155");
    }
  } else {
    total_amount = total_amount - checkbox.value;
    if (checkbox.value == 18) {
      packages = packages.filter((e) => e !== "1 post at $18");
    } else if (checkbox.value == 85) {
      packages = packages.filter((e) => e !== "5 posts at $85");
    } else {
      packages = packages.filter((e) => e !== "10 posts at $155");
    }
  }
  discounted_amount = total_amount;
  total_div.innerHTML = `Total Amount: $${total_amount}`;
}

// changes the input styling back to normal on keypress
function changeBackground(id) {
  document.getElementById(id).style.borderColor = "#ced4da";
  document.getElementById(id).style.backgroundColor = "#fff";
}

function applyCoupon() {
  if (total_amount != "") {
    if (coupon_code_input.value) {
      if (coupon_code_input.value == "TWENTYFIVE") {
        COUPON_CODE = "TWENTYFIVE";
        coupon_code_alert.innerHTML = "Coupon Code Applied!";
        coupon_code_alert.classList.add("alert-success");
        coupon_code_alert.classList.remove("alert-danger");
        coupon_code_alert.style.display = "block";
        discount_amount = total_amount * 0.25;
        discounted_amount = total_amount - discount_amount;
        total_div.innerHTML = `Total Amount: <strike>$${total_amount}</strike> $${discounted_amount}`;
      } else {
        COUPON_CODE = "none";
        coupon_code_alert.innerHTML = "Invalid Coupon Code";
        coupon_code_alert.classList.add("alert-danger");
        coupon_code_alert.classList.remove("alert-success");
        coupon_code_alert.style.display = "block";
        discount_amount = 0;
        discounted_amount = total_amount;
        total_div.innerHTML = `Total Amount: $${total_amount}`;
      }
    } else {
      COUPON_CODE = "none";
      coupon_code_alert.innerHTML = "Insert coupon code";
      coupon_code_alert.classList.add("alert-danger");
      coupon_code_alert.classList.remove("alert-success");
      coupon_code_alert.style.display = "block";
      discount_amount = 0;
      discounted_amount = total_amount;
      total_div.innerHTML = `Total Amount: $${total_amount}`;
    }
  } else {
    COUPON_CODE = "none";
    coupon_code_alert.innerHTML = "No packages selected";
    coupon_code_alert.classList.add("alert-danger");
    coupon_code_alert.classList.remove("alert-success");
    coupon_code_alert.style.display = "block";
    discount_amount = 0;
    discounted_amount = total_amount;
    total_div.innerHTML = `Total Amount: $${total_amount}`;
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const submitForm = () => {
  if (name_input.value === "") {
    error.push("Fill name field");
    name_input.placeholder = "Please fill out this field";
    name_input.style.borderColor = "#f5c2c7";
    name_input.style.backgroundColor = "#f8d7da";
  }

  if (email_input.value === "") {
    error.push("Fill email field");
    email_input.placeholder = "Please fill out this field";
    email_input.style.borderColor = "#f5c2c7";
    email_input.style.backgroundColor = "#f8d7da";
  } else if (!validateEmail(email_input.value)) {
    error.push("Enter a valid email address");
    email_input.value = "Enter a valid email address";
    email_input.style.borderColor = "#f5c2c7";
    email_input.style.backgroundColor = "#f8d7da";
  }

  if (skype_input.value === "") {
    error.push("Fill skype field");
    skype_input.placeholder = "Please fill out this field";
    skype_input.style.borderColor = "#f5c2c7";
    skype_input.style.backgroundColor = "#f8d7da";
  }

  if (bhw_input.value === "") {
    error.push("Fill bhw field");
    bhw_input.placeholder = "Please fill out this field";
    bhw_input.style.borderColor = "#f5c2c7";
    bhw_input.style.backgroundColor = "#f8d7da";
  }

  if (keyword_input.value === "") {
    error.push("Fill keyword and url field");
    keyword_input.placeholder = "Please fill out this field";
    keyword_input.style.borderColor = "#f5c2c7";
    keyword_input.style.backgroundColor = "#f8d7da";
  }

  var checkbox_error;
  for (let i = 0; i < package_checkboxes.length; i++) {
    if (!package_checkboxes[i].checked) {
      checkbox_error = "You must select at least 1 package";
    } else {
      checkbox_error = "";
      break;
    }
  }
  if (checkbox_error == "") {
    checkbox_alert.style.display = "none";
  } else {
    checkbox_alert.style.display = "block";
    checkbox_alert.innerHTML = checkbox_error;
    error.push(checkbox_error);
  }

  if (error == "") {
    document.querySelector(".container").style.display = "block";
    document.querySelectorAll(".order-details")[0].innerHTML =
      "Name: " + name_input.value;
    document.querySelectorAll(".order-details")[1].innerHTML =
      "Email: " + email_input.value;
    document.querySelectorAll(".order-details")[2].innerHTML =
      "Skype Username: " + skype_input.value;
    document.querySelectorAll(".order-details")[3].innerHTML =
      "BlackHatWorld Username: " + bhw_input.value;
    document.querySelectorAll(".order-details")[4].innerHTML =
      "Packages ordered: " + packages;
    document.querySelectorAll(".order-details")[5].innerHTML =
      "Gross Amount: $" + total_amount;
    document.querySelectorAll(".order-details")[6].innerHTML =
      "Discount: $" + discount_amount;
    document.querySelectorAll(".order-details")[7].innerHTML =
      "Net Amount: $" + discounted_amount;
    window.scrollTo(0, document.body.scrollHeight);
  } else {
    error = [];
  }
};

function sendEmail() {
  var templateParams = {
    from_name: document.getElementById("name").value,
    to_name: "Andrea Klarin",
    from_email: document.getElementById("email").value,
    skype_username: document.getElementById("skype").value,
    bhw_username: document.getElementById("bhw").value,
    packages_ordered: packages,
    total_amount: total_amount,
    coupon_code: COUPON_CODE,
    discount_amount: discount_amount,
    discounted_amount: discounted_amount,
    keyword: document.getElementById("keyword-url").value,
  };

  emailjs
    .send("service_jccmaf3", "template_jkakun5", templateParams)
    .then((res, err) => {
      if (res) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
}

// paypal.Button.render(
//   {
//     // Configure environment
//     env: "sandbox",
//     client: {
//       sandbox: sandboxAPI,
//       production: productionAPI,
//     },
//     // Customize button (optional)
//     locale: "en_US",
//     style: {
//       size: "small",
//       color: "blue",
//       shape: "rect",
//       label: "pay",
//       tagline: false,
//     },

//     // Enable Pay Now checkout flow (optional)
//     commit: true,

//     // Set up a payment
//     payment: function (data, actions) {
//       return actions.payment.create({
//         transactions: [
//           {
//             amount: {
//               total: discounted_amount,
//               currency: "USD",
//             },
//           },
//         ],
//       });
//     },
//     // Execute the payment
//     onAuthorize: function (data, actions) {
//       return actions.payment.execute().then(function () {
//         // Show a confirmation message to the buyer
//         window.alert("Thank you for your purchase!");
//       });
//     },
//   },
//   "#paypal-button"
// );

paypal
  .Buttons({
    style: {
      size: "small",
      color: "blue",
      shape: "rect",
      label: "pay",
      tagline: false,
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: discounted_amount,
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        window.alert("Thank you for your purchase!");
        sendEmail();
      });
    },
  })
  .render("#paypal-button");
