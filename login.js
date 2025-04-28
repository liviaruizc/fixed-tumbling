document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded (login)");

    const authToken = localStorage.getItem("authToken");
    const username = localStorage.getItem("loggedInUsername");

    if (authToken && username) {
        console.log("Already logged in. Redirecting to profile...");
        window.location.href = "profile.html";
        return;
    }

    const form = document.getElementById("loginForm");
    if (!form) {
        console.error("Login form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const enteredUsername = document.getElementById("username").value.trim();
        const enteredPassword = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Hash entered password before checking
        const enteredPasswordHashed = await hashPassword(enteredPassword);

        const user = users.find(user => user.username === enteredUsername && user.password === enteredPasswordHashed);

        if (user) {
            const authToken = Math.random().toString(36).substr(2);
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("loggedInUsername", enteredUsername);

            alert("Login successful!");
            window.location.href = "profile.html";
        } else {
            alert("Incorrect username or password.");
        }
    });

    // Function to hash password
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
});
