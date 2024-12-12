//Input fields
const userInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

//HTML elements
const form = document.querySelector("form");
const errorsContainer = document.querySelector(".errors-container");

const emailIcon = emailInput.parentElement.querySelector("svg");
const passwordIcon = passwordInput.parentElement.querySelector("svg");

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const svg = input.parentElement.querySelector("svg");
    svg.classList.remove("icon-error");
  });
});

//Errors array
let errors = [];

//Submit event
form.addEventListener("submit", (e) => {
  if (userInput) {
    //Sign up errors
    errors = getSignupErrors();
  } else {
    //Log in errors
    errors = getLoginErrors();
  }

  if (errors.length > 0) {
    //Stop submit and display errors
    e.preventDefault();
    errorsContainer.innerHTML = "";
    errorsContainer.classList.remove("hidden");
    errors.forEach((error) => addError(error));
  }
});

function getSignupErrors() {
  const signupErrors = [];
  const userIcon = userInput.parentElement.querySelector("svg") || null;

  const username = userInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  //Empty fields errors
  if (username === "" || username === null) {
    signupErrors.push("Username required");
    userIcon.classList.add("icon-error");
  }

  if (email === "" || email === null) {
    signupErrors.push("Email required");
    emailIcon.classList.add("icon-error");
  }

  if (password === "" || password === null) {
    signupErrors.push("Password required");
    passwordIcon.classList.add("icon-error");
  }

  //Password field length
  if (password.length < 8) {
    signupErrors.push("Password must have 8 characters");
    passwordIcon.classList.add("icon-error");
  }

  //Password number length
  if (!/\d/.test(password)) {
    signupErrors.push("Password have a number");
    passwordIcon.classList.add("icon-error");
  }

  return signupErrors;
}

function getLoginErrors() {
  const loginErrors = [];

  const email = emailInput.value;
  const password = passwordInput.value;

  //Empty fields errors
  if (email === "" || email === null) {
    loginErrors.push("Email required");
    emailIcon.classList.add("icon-error");
  }

  if (password === "" || password === null) {
    loginErrors.push("Password required");
    passwordIcon.classList.add("icon-error");
  }

  return loginErrors;
}

function addError(text) {
  const message = document.createElement("span");
  message.classList.add("error");
  message.innerText = text;

  errorsContainer.append(message);
}

function notifyError() {
  errorsContainer.innerHTML = "";
  errorsContainer.classList.remove("hidden");
  errors.forEach((error) => addError(error));
}
