document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    const form = document.getElementById("registerForm");
    console.log("form found:", form);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        alert("Form submitted");

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        if (!isStrongPassword(password)) {
            alert("Password must be at least 8 characters long and include:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character.");
            return;
        }
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === username)) {
            alert("Username already exists. Please choose another one.");
            return;
        }

        // Require strong password
        function isStrongPassword(password) {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        }

        // Hash the password using SHA-256
        const hashedPassword = await hashPassword(password);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            posts: [],
            joinDate: new Date().toLocaleDateString()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful. Please log in.");
        window.location.href = "login.html";
    });

    // 🔒 Function to hash password
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
});
