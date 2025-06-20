// js/auth.js

// Redirect if already logged in
if (sessionStorage.getItem("loggedInUser")) {
  if (window.location.pathname.includes("login") || window.location.pathname.includes("signup")) {
    window.location.href = "index.html";
  }
}

// Handle Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.email === email);

    if (exists) {
      alert("User already exists with this email.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("loggedInUser", JSON.stringify({ name, email }));
    window.location.href = "index.html";
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify({ name: user.name, email: user.email }));
    window.location.href = "index.html";
  });
}

// Optional: Add logout function if needed later