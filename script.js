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
