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

    // Fill Profile Info
    document.getElementById("welcomeMessage").innerText = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
    document.getElementById("profileUsername").innerText = loggedInUser.username;
    document.getElementById("profileEmail").innerText = loggedInUser.email;
    document.getElementById("profileFirstName").innerText = loggedInUser.firstName || "N/A";
    document.getElementById("profileLastName").innerText = loggedInUser.lastName || "N/A";
    document.getElementById("profileBio").innerText = loggedInUser.bio || "No bio yet!";
    document.getElementById("profileBioTop").innerText = loggedInUser.bio || "No bio yet!";
    document.getElementById("profileJoinDate").innerText = loggedInUser.joinDate || "N/A";

    // ✅ Fixing Edit Profile functionality
    document.getElementById("editProfileBtn").addEventListener("click", function () {
        document.getElementById("uploadImage").style.display = "block";
        document.getElementById("saveProfileBtn").style.display = "block";
        document.getElementById("editProfileBtn").style.display = "none";

        const newBio = prompt("Enter new bio:", loggedInUser.bio || "");
        if (newBio != null) {
            loggedInUser.bio = newBio;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            document.getElementById("profileBio").innerText = newBio;
            document.getElementById("profileBioTop").innerText = newBio;
        }
    }); // 🔥 Closed correctly!

    // ✅ Now separately: Display posts
    const postsContainer = document.querySelector(".posts-section");
    if (loggedInUser.posts && loggedInUser.posts.length > 0) {
        loggedInUser.posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");

            const postTitle = document.createElement("h4");
            postTitle.innerText = post.title;

            const postContent = document.createElement("p");
            postContent.innerText = post.content;

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postContent);

            if (post.image) {
                const postImage = document.createElement("img");
                postImage.src = post.image;
                postImage.alt = "Post Image";
                postImage.classList.add("post-image");
                postDiv.appendChild(postImage);
            }

            postsContainer.appendChild(postDiv);
        });
    } else {
        postsContainer.innerHTML += "<p>You haven't posted anything yet.</p>";
    }

    // ✅ Save Profile functionality
    document.getElementById("saveProfileBtn").addEventListener("click", function () {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        document.getElementById("uploadImage").style.display = "none";
        document.getElementById("saveProfileBtn").style.display = "none";
        document.getElementById("editProfileBtn").style.display = "block";
        alert("Profile Updated!");
    });

    // ✅ Upload Image functionality
    document.getElementById("uploadImage").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file (jpg, jpeg, or png).");
                return;
            }

            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert("Image too large! Please upload a file smaller than 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const imageData = event.target.result;
                document.getElementById("profileImage").src = imageData;

                loggedInUser.profileImage = imageData;
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                updateUserInStorage(loggedInUser);
            };
            reader.readAsDataURL(file);
        }
    });

    // ✅ Helper function to update users list
    function updateUserInStorage(updatedUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.username === updatedUser.username);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
});
