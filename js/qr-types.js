/* ===== QR-TYPES.JS – Dynamic QR Input Fields ===== */

console.log("QR Types Module Loaded");

// DOM elements
const qrTypeSelect = document.getElementById("qrType");
const dynamicFields = document.getElementById("dynamicFields");

/**
 * Function to render dynamic input fields based on QR Type
 * @param {string} type - QR Type selected by user
 */
function renderFields(type) {
    dynamicFields.innerHTML = ""; // Clear previous fields

    switch (type) {
        case "text":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="qrInput">Enter Text or URL</label>
                    <input type="text" id="qrInput" placeholder="https://example.com" required>
                </div>
            `;
            break;

        case "email":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="example@email.com" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" placeholder="Subject">
                </div>
            `;
            break;

        case "phone":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91XXXXXXXXXX" required>
                </div>
            `;
            break;

        case "sms":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="smsNumber">Phone Number</label>
                    <input type="tel" id="smsNumber" placeholder="+91XXXXXXXXXX" required>
                </div>
                <div class="form-group">
                    <label for="smsMessage">Message</label>
                    <input type="text" id="smsMessage" placeholder="Hello">
                </div>
            `;
            break;

        case "whatsapp":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="waNumber">WhatsApp Number</label>
                    <input type="tel" id="waNumber" placeholder="91XXXXXXXXXX" required>
                </div>
                <div class="form-group">
                    <label for="waMessage">Message</label>
                    <input type="text" id="waMessage" placeholder="Hello">
                </div>
            `;
            break;

        case "upi":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="upiId">UPI ID</label>
                    <input type="text" id="upiId" placeholder="name@bank" required>
                </div>
                <div class="form-group">
                    <label for="upiName">Payee Name</label>
                    <input type="text" id="upiName" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <label for="upiAmount">Amount (Optional)</label>
                    <input type="number" id="upiAmount" placeholder="100">
                </div>
            `;
            break;

        case "wifi":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="ssid">WiFi Name (SSID)</label>
                    <input type="text" id="ssid" placeholder="WiFi Name" required>
                </div>
                <div class="form-group">
                    <label for="wifiPass">Password</label>
                    <input type="text" id="wifiPass" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="wifiType">Security Type</label>
                    <select id="wifiType">
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                    </select>
                </div>
            `;
            break;

        case "vcard":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="vName">Full Name</label>
                    <input type="text" id="vName" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="vPhone">Phone</label>
                    <input type="tel" id="vPhone" placeholder="+91XXXXXXXXXX">
                </div>
                <div class="form-group">
                    <label for="vEmail">Email</label>
                    <input type="email" id="vEmail" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label for="vOrg">Organization</label>
                    <input type="text" id="vOrg" placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label for="vTitle">Title</label>
                    <input type="text" id="vTitle" placeholder="Job Title">
                </div>
                <div class="form-group">
                    <label for="vWebsite">Website</label>
                    <input type="url" id="vWebsite" placeholder="https://example.com">
                </div>
            `;
            break;

        case "event":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="eventName">Event Name</label>
                    <input type="text" id="eventName" placeholder="Event Name" required>
                </div>
                <div class="form-group">
                    <label for="eventLocation">Location</label>
                    <input type="text" id="eventLocation" placeholder="Location">
                </div>
                <div class="form-group">
                    <label for="eventStart">Start Date & Time</label>
                    <input type="datetime-local" id="eventStart">
                </div>
                <div class="form-group">
                    <label for="eventEnd">End Date & Time</label>
                    <input type="datetime-local" id="eventEnd">
                </div>
            `;
            break;

        case "location":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label for="lat">Latitude</label>
                    <input type="text" id="lat" placeholder="28.7041" required>
                </div>
                <div class="form-group">
                    <label for="lng">Longitude</label>
                    <input type="text" id="lng" placeholder="77.1025" required>
                </div>
            `;
            break;

        default:
            dynamicFields.innerHTML = `
                <p>Please select a valid QR type</p>
            `;
            break;
    }
}

/* ===== EVENT LISTENER FOR QR TYPE SELECTION ===== */
if (qrTypeSelect) {
    qrTypeSelect.addEventListener("change", () => {
        renderFields(qrTypeSelect.value);
    });
}

// Render default type on page load
renderFields("text");
