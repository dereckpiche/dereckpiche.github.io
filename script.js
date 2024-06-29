// READ PDFs
document.addEventListener("DOMContentLoaded", function () {
  const postList = document.getElementById("post-list");
  const postContent = document.getElementById("post-content");

  if (postList) {
    // Load posts on index page
    fetch("posts/posts.txt")
      .then((response) => response.text())
      .then((data) => {
        const posts = data.split("\n").filter((line) => line.trim() !== "");
        posts.forEach((filename) => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `post.html?post=${encodeURIComponent(filename.trim())}`;
          // Use filename without extension as the link text
          const postTitle = filename.replace(/\.[^/.]+$/, "").trim();
          link.textContent = postTitle;
          listItem.appendChild(link);
          postList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Error loading posts.txt:", error));
  } else if (postContent) {
    // Load individual post on post.html for pdf files
    const urlParams = new URLSearchParams(window.location.search);
    const postFilename = urlParams.get("post");
    if (postFilename && postFilename.endsWith(".pdf")) {
      postContent.innerHTML = `<embed src="posts/${decodeURIComponent(postFilename)}" width="100%" height="10000px" type="application/pdf">`;
    }
  }
});
