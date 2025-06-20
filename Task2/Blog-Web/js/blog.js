// js/blog.js

const blogList = document.getElementById("blogList");
const postForm = document.getElementById("postForm");

// Show blog posts on index.html
if (blogList) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.forEach((blog, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${blog.title}</h5>
          <p class="card-text">${blog.content.substring(0, 100)}...</p>
          <p class="text-muted small">by ${blog.author}</p>
          <button class="btn btn-sm btn-outline-primary me-2" onclick="editPost(${index})">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deletePost(${index})">Delete</button>
        </div>
      </div>
    `;
    blogList.appendChild(div);
  });
}

function editPost(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "new-post.html";
}

function deletePost(index) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  location.reload();
}

// Handle post creation or edit
if (postForm) {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs[editIndex];
    if (blog) {
      titleInput.value = blog.title;
      contentInput.value = blog.content;
    }
  }

  postForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    const newBlog = {
      title: titleInput.value,
      content: contentInput.value,
      author: loggedInUser ? loggedInUser.name : "Anonymous"
    };

    if (editIndex !== null) {
      blogs[editIndex] = newBlog;
      localStorage.removeItem("editIndex");
    } else {
      blogs.push(newBlog);
    }

    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.href = "index.html";
  });
}
