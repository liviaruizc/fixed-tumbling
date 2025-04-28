document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const authToken = localStorage.getItem("authToken");

    if (authToken && logoutBtn) {
        logoutBtn.style.display = "inline-block"; // Make sure it's visible

        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("authToken");
            localStorage.removeItem("loggedInUsername");
            localStorage.removeItem("loggedInUser"); // Optional cleanup
            window.location.href = "login.html";
        });
    } else if (logoutBtn) {
        logoutBtn.style.display = "none"; // Hide if no authToken
    }
});
