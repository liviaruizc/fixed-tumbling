document.addEventListener("DOMContentLoaded", function () {
    const authToken = localStorage.getItem("authToken");
    const username = localStorage.getItem("loggedInUsername");

    if (!authToken || !username) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(user => user.username === username);

    if (!loggedInUser) {
        alert("User not found. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedInUsername");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("createPostForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("postTitle").value.trim();
        const content = document.getElementById("postContent").value.trim();
        const date = new Date().toLocaleDateString();
        const imageFile = document.getElementById("postImage")?.files[0];

        if (imageFile) {
            if (!imageFile.type.startsWith("image/")) {
                alert("Please upload a valid image file (jpg, jpeg, png).");
                return;
            }

            if (imageFile.size > 2 * 1024 * 1024) {
                alert("Image too large! Please upload a file smaller than 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const imageData = event.target.result;

                const newPost = { title, content, date, image: imageData };

                loggedInUser.posts = loggedInUser.posts || [];
                loggedInUser.posts.push(newPost);

                // Save back to users array
                users[users.findIndex(user => user.username === loggedInUser.username)] = loggedInUser;
                localStorage.setItem("users", JSON.stringify(users));

                alert("Post created successfully.");
                window.location.href = "profile.html";
            };
            reader.readAsDataURL(imageFile);
        } else {
            const newPost = { title, content, date, image: null };

            loggedInUser.posts = loggedInUser.posts || [];
            loggedInUser.posts.push(newPost);

            users[users.findIndex(user => user.username === loggedInUser.username)] = loggedInUser;
            localStorage.setItem("users", JSON.stringify(users));

            alert("Post created successfully.");
            window.location.href = "profile.html";
        }
    });
});
