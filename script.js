function updateTime() {
    var now = new Date();

    var clockElement = document.getElementById("Clock-tx");
    var hours = String(now.getHours()).padStart(2, '0'); // Format hours as 2 digits
    var minutes = String(now.getMinutes()).padStart(2, '0'); // Format minutes as 2 digits
    clockElement.textContent = hours + ":" + minutes;

    var weekdayElement = document.getElementById("Weekday");
    weekdayElement.textContent = now.toLocaleDateString(undefined, { weekday: 'long' });

    var ColnElement = document.getElementById("Coln");
    ColnElement.textContent = ',';

    var yearElement = document.getElementById("Year");
    yearElement.textContent = now.getFullYear();

    var monthElement = document.getElementById("Month");
    monthElement.textContent = now.toLocaleDateString(undefined, { month: 'long' });

    var dayElement = document.getElementById("Day");
    dayElement.textContent = now.getDate();
  } setInterval(updateTime, 1000); // Update every second

  // LOGIN
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
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          window.localStorage.setItem("token", token); // Store the token in localStorage
  
          // Redirect to the dashboard page
          window.location.href = "../../index.html";
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  });