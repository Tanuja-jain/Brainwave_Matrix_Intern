// js/comments.js

// Poppins font for a clean professional look
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Apply styling to other pages
const applyGlobalStyling = () => {
  document.body.style.fontFamily = "'Poppins', sans-serif";
  document.body.style.backgroundColor = "#f3f6f9";
  document.querySelectorAll(".form-control").forEach(el => {
    el.classList.add("shadow-sm");
    el.style.borderRadius = "0.5rem";
  });
  document.querySelectorAll("button").forEach(el => {
    el.classList.add("rounded-pill");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  applyGlobalStyling();

  const blogDetail = document.getElementById("blogDetail");
  const commentList = document.getElementById("commentList");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("comment");

  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = urlParams.get("post");
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs[postIndex];

  if (blog) {
    blogDetail.innerHTML = `
      <div class="card p-4 shadow-sm bg-white border rounded-4 mb-4">
        <h2 class="text-dark fw-bold mb-2">${blog.title}</h2>
        <p class="text-muted">by <strong>${blog.author}</strong></p>
        <hr />
        <p class="text-dark fs-5 lh-lg">${blog.content}</p>
      </div>
    `;
  }

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    const blogComments = comments[postIndex] || [];
    commentList.innerHTML = "";

    if (blogComments.length === 0) {
      commentList.innerHTML = '<div class="alert alert-info">No comments yet. Be the first to comment!</div>';
    }

    blogComments.forEach(c => {
      const div = document.createElement("div");
      div.className = "mb-3 p-3 bg-light border rounded-3 shadow-sm";
      div.innerHTML = `
        <div class="fw-semibold text-primary mb-1">${c.author}</div>
        <div class="text-dark">${c.text}</div>
      `;
      commentList.appendChild(div);
    });
  }

  loadComments();

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please login to comment.");
      return;
    }

    const trimmedComment = commentInput.value.trim();
    if (!trimmedComment) return;

    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    if (!comments[postIndex]) comments[postIndex] = [];

    comments[postIndex].push({
      author: loggedInUser.name,
      text: trimmedComment
    });

    localStorage.setItem("comments", JSON.stringify(comments));
    commentInput.value = "";
    loadComments();
  });
});
