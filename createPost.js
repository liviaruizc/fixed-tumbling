document.getElementById("createPostForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get current logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("You must be logged in to create a post.");
        window.location.href = "login.html";
        return;
    }

    // Get post data from form
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const date = new Date().toLocaleDateString();
    const imageFile = document.getElementById("postImage")?.files[0];

    if (imageFile) {
        // 🚀 Secure file validation
        if (!imageFile.type.startsWith("image/")) {
            alert("Please upload a valid image file (jpg, jpeg, png).");
            return;
        }

        if (imageFile.size > 2 * 1024 * 1024) { // 2MB
            alert("Image too large! Please upload a file smaller than 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;

            const newPost = { title, content, date, image: imageData };

            // Save to loggedInUser
            loggedInUser.posts = loggedInUser.posts || [];
            loggedInUser.posts.push(newPost);
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            // Also update users array
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(user => user.username === loggedInUser.username);

            if (userIndex !== -1) {
                users[userIndex].posts = loggedInUser.posts;
                localStorage.setItem("users", JSON.stringify(users));
            }

            alert("Post created successfully.");
            window.location.href = "profile.html";
        };
        reader.readAsDataURL(imageFile);
    } else {
        // No image case
        const newPost = { title, content, date, image: null };

        loggedInUser.posts = loggedInUser.posts || [];
        loggedInUser.posts.push(newPost);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.username === loggedInUser.username);

        if (userIndex !== -1) {
            users[userIndex].posts = loggedInUser.posts;
            localStorage.setItem("users", JSON.stringify(users));
        }

        alert("Post created successfully.");
        window.location.href = "profile.html";
    }
});

