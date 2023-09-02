
document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch and update data
  async function fetchData() {
    // Check if there's a stored token from the login
    const storedToken = window.localStorage.getItem("token");
    const storedUsername = window.localStorage.getItem("username");
    if (storedToken) {
      // Make a GET request to fetch device details
      try {
        const response = await fetch("http://185.230.163.241:8000/devices/", {
          method: "GET",
          headers: {
            "Authorization": `Token ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const device = data.devices[0]; // Get the first device

          // Update HTML elements with the parsed data
          document.getElementById("USER").textContent = storedUsername; 
          document.getElementById("DEVICE").textContent = device.uid.slice(0, 10);
          document.getElementById("TEMP").textContent = device.sensors.temp.toFixed(2);
          document.getElementById("HUMID").textContent = device.sensors.humid.toFixed(2);
          document.getElementById("GAS").textContent = device.sensors.smk;
          document.getElementById("REL1").checked = device.relays.rel1;
          document.getElementById("REL2").checked = device.relays.rel2;
          document.getElementById("REL3").checked = device.relays.rel3;
          document.getElementById("REL4").checked = device.relays.rel4;
        } else {
          console.error("Failed to fetch device details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.error("No token found. Please log in.");
    }
  }

  // Initial fetch
  fetchData();

  // Update data every 3 seconds
  setInterval(fetchData, 3000);
});


// RELAYS states
document.addEventListener("DOMContentLoaded", async function () {
    // Function to send all relay states to the server
    async function sendAllRelayStates(relays) {
      // Check if there's a stored token from the login
      const storedToken = window.localStorage.getItem("token");

      if (storedToken) {
        // Make a POST request to update all relay states
        try {
          const uid = document.getElementById("DEVICE").textContent; // Get the device UID
          const response = await fetch(`http://185.230.163.241:8000/api/1/${uid}/relays/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${storedToken}`,
            },
            body: JSON.stringify(relays), // Send all relay states
          });

          if (response.ok) {
            // Successfully updated the relay states
            alert("All relay states updated successfully.");
          } else {
            console.error("Failed to update relay states");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        console.error("No token found. Please log in.");
      }
    }

    // Event listeners for changes in all relay states (checkboxes)
    document.getElementById("REL1").addEventListener("change", function () {
      const relays = {
        rel1: this.checked,
        rel2: document.getElementById("REL2").checked,
        rel3: document.getElementById("REL3").checked,
        rel4: document.getElementById("REL4").checked,
      };
      sendAllRelayStates(relays);
    });

    document.getElementById("REL2").addEventListener("change", function () {
      const relays = {
        rel1: document.getElementById("REL1").checked,
        rel2: this.checked,
        rel3: document.getElementById("REL3").checked,
        rel4: document.getElementById("REL4").checked,
      };
      sendAllRelayStates(relays);
    });

    document.getElementById("REL3").addEventListener("change", function () {
      const relays = {
        rel1: document.getElementById("REL1").checked,
        rel2: document.getElementById("REL2").checked,
        rel3: this.checked,
        rel4: document.getElementById("REL4").checked,
      };
      sendAllRelayStates(relays);
    });

    document.getElementById("REL4").addEventListener("change", function () {
      const relays = {
        rel1: document.getElementById("REL1").checked,
        rel2: document.getElementById("REL2").checked,
        rel3: document.getElementById("REL3").checked,
        rel4: this.checked,
      };
      sendAllRelayStates(relays);
    });
});


