
// LOGIN and storing data
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = loginForm.elements.LOGIN_USERNAME.value;
    const password = loginForm.elements.LOGIN_PASS.value;

    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://185.230.163.241:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Add this line to specify JSON response
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        window.localStorage.setItem("token", token); // Store the token in localStorage
        window.localStorage.setItem("username", username); // Store the username in localStorage

        // Redirect to the dashboard page
        window.location.href = "../dashboard";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});

