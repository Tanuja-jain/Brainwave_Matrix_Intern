// js/post.js

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");

  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please login to create a post.");
    window.location.href = "login.html";
    return;
  }

  postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) return;

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({
      title,
      content,
      author: loggedInUser.name,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.href = "index.html";
  });
});
