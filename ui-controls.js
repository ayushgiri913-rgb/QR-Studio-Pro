/* ===== UI-CONTROLS.JS – QR Studio UI Interaction Module ===== */

console.log("UI Controls Module Loaded");

// DOM Elements
const qrTypeSelect = document.getElementById("qrType");
const dynamicFields = document.getElementById("dynamicFields");

const fgColor = document.getElementById("qrColor");
const bgColor = document.getElementById("bgColor");
const qrSize = document.getElementById("qrSize");
const sizeValue = document.getElementById("sizeValue");

const dotStyleSelect = document.getElementById("dotStyle");
const logoInput = document.getElementById("logoUpload");
const frameTextInput = document.getElementById("frameText");
const frameColorInput = document.getElementById("frameColor");
const gradientToggle = document.getElementById("gradientToggle");
const glowToggle = document.getElementById("glowToggle");
const radiusRange = document.getElementById("radiusRange");

const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");

/* ===== DYNAMIC INPUT RENDERING ===== */
function renderFields(type) {
    dynamicFields.innerHTML = "";

    switch(type) {
        case "text":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Enter Text or URL</label>
                    <input type="text" id="qrInput" placeholder="https://example.com">
                </div>
            `;
            break;

        case "email":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="email" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" id="subject" placeholder="Subject">
                </div>
            `;
            break;

        case "phone":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91XXXXXXXXXX">
                </div>
            `;
            break;

        case "whatsapp":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>WhatsApp Number</label>
                    <input type="tel" id="waNumber" placeholder="91XXXXXXXXXX">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <input type="text" id="waMessage" placeholder="Hello">
                </div>
            `;
            break;

        case "upi":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>UPI ID</label>
                    <input type="text" id="upiId" placeholder="name@bank">
                </div>
                <div class="form-group">
                    <label>Payee Name</label>
                    <input type="text" id="upiName" placeholder="Your Name">
                </div>
                <div class="form-group">
                    <label>Amount (Optional)</label>
                    <input type="number" id="upiAmount" placeholder="100">
                </div>
            `;
            break;

        case "wifi":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>WiFi Name (SSID)</label>
                    <input type="text" id="ssid" placeholder="WiFi Name">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="text" id="wifiPass" placeholder="Password">
                </div>
            `;
            break;

        case "location":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Latitude</label>
                    <input type="text" id="lat" placeholder="28.7041">
                </div>
                <div class="form-group">
                    <label>Longitude</label>
                    <input type="text" id="lng" placeholder="77.1025">
                </div>
            `;
            break;

        case "vcard":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="vcName" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" id="vcPhone" placeholder="+91XXXXXXXXXX">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="vcEmail" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label>Website</label>
                    <input type="url" id="vcWebsite" placeholder="https://example.com">
                </div>
            `;
            break;

        case "event":
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" id="eventName" placeholder="Meeting">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="eventLocation" placeholder="New York">
                </div>
                <div class="form-group">
                    <label>Start Date & Time</label>
                    <input type="datetime-local" id="eventStart">
                </div>
                <div class="form-group">
                    <label>End Date & Time</label>
                    <input type="datetime-local" id="eventEnd">
                </div>
            `;
            break;
    }
}

/* ===== LIVE PREVIEW UPDATE ===== */
function liveUpdate() {
    const inputField = dynamicFields.querySelector("input");
    if (!inputField || inputField.value.trim() === "") return;
    generateBtn.click(); // Trigger generateQR in app.js
}

/* ===== EVENT LISTENERS ===== */
qrTypeSelect.addEventListener("change", () => {
    renderFields(qrTypeSelect.value);
});

// Color pickers and size slider
[fgColor, bgColor].forEach(el => {
    el?.addEventListener("input", liveUpdate);
});

if (qrSize) {
    qrSize.addEventListener("input", () => {
        sizeValue.textContent = qrSize.value + "px";
        liveUpdate();
    });
}

// Dot style
dotStyleSelect?.addEventListener("change", liveUpdate);

// Logo upload
logoInput?.addEventListener("change", () => {
    liveUpdate();
});

// Frame text
frameTextInput?.addEventListener("input", liveUpdate);

// Frame color, gradient, glow, radius
[frameColorInput, gradientToggle, glowToggle, radiusRange].forEach(el => {
    el?.addEventListener("input", liveUpdate);
});

// Clear button
clearBtn?.addEventListener("click", () => {
    const qrPreview = document.getElementById("qrPreview");
    qrPreview.innerHTML = "<p>Your QR code will appear here</p>";
});