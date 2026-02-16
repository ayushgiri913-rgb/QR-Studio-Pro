/* ===== APP.JS – FULL PROFESSIONAL QR STUDIO LOGIC ===== */

/* ===== GLOBAL VARIABLES ===== */
let qrCodeInstance = null;

/* ===== DOM ELEMENTS ===== */
const qrContainer = document.getElementById("qrPreview");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const qrTypeSelect = document.getElementById("qrType");
const dynamicFields = document.getElementById("dynamicFields");

const fgColorInput = document.getElementById("qrColor");
const bgColorInput = document.getElementById("bgColor");
const qrSizeInput = document.getElementById("qrSize");
const sizeValueDisplay = document.getElementById("sizeValue");

const logoInput = document.getElementById("logoUpload");
const frameTextInput = document.getElementById("frameText");
const dotStyleSelect = document.getElementById("dotStyle");
const frameColorInput = document.getElementById("frameColor");
const gradientToggle = document.getElementById("gradientToggle");
const glowToggle = document.getElementById("glowToggle");
const radiusRange = document.getElementById("radiusRange");

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Generate the QR code based on current inputs
 */
function generateQR() {
    const textInput = dynamicFields.querySelector("input, textarea");
    if (!textInput || textInput.value.trim() === "") {
        alert("Please enter valid data");
        return;
    }

    const qrText = textInput.value.trim();
    const fgColor = fgColorInput.value || "#000000";
    const bgColor = bgColorInput.value || "#ffffff";
    const qrSize = parseInt(qrSizeInput.value) || 250;
    const dotStyle = dotStyleSelect.value || "square";
    const frameText = frameTextInput.value || "";
    const frameColor = frameColorInput.value || "#302b63";
    const gradientEnabled = gradientToggle.checked;
    const glowEnabled = glowToggle.checked;
    const radiusValue = radiusRange.value || 20;

    /* ===== CLEAR PREVIOUS QR ===== */
    qrContainer.innerHTML = "";

    /* ===== CREATE QR FRAME ===== */
    const frameWrapper = document.createElement("div");
    frameWrapper.className = "qr-frame";
    frameWrapper.style.borderRadius = radiusValue + "px";

    if (gradientEnabled) {
        frameWrapper.style.background = `linear-gradient(135deg, #1e1e3f, ${frameColor})`;
    } else {
        frameWrapper.style.background = frameColor;
    }

    if (glowEnabled) {
        frameWrapper.classList.add("glow");
    } else {
        frameWrapper.classList.remove("glow");
    }

    const qrDiv = document.createElement("div");
    qrDiv.id = "innerQR";
    frameWrapper.appendChild(qrDiv);

    /* ===== FRAME TEXT ===== */
    if (frameText !== "") {
        const textEl = document.createElement("div");
        textEl.className = "qr-bottom-text";
        textEl.innerText = frameText;
        frameWrapper.appendChild(textEl);
    }

    qrContainer.appendChild(frameWrapper);

    /* ===== GENERATE QR CODE USING QRCode.js ===== */
    if (qrCodeInstance) qrCodeInstance.clear();

    qrCodeInstance = new QRCode(qrDiv, {
        text: qrText,
        width: qrSize,
        height: qrSize,
        colorDark: fgColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.H
    });

    /* ===== ADD LOGO IF SELECTED ===== */
    addLogoToQR();
}

/**
 * Add center logo to QR if uploaded
 */
function addLogoToQR() {
    if (!logoInput.files || logoInput.files.length === 0) return;

    const qrImg = qrContainer.querySelector("img");
    if (!qrImg) return;

    const logoFile = logoInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoImg = document.createElement("img");
        logoImg.src = e.target.result;
        logoImg.style.position = "absolute";
        logoImg.style.width = "20%";
        logoImg.style.height = "20%";
        logoImg.style.top = "40%";
        logoImg.style.left = "40%";
        logoImg.style.pointerEvents = "none";

        qrContainer.querySelector(".qr-frame").appendChild(logoImg);
    };
    reader.readAsDataURL(logoFile);
}

/**
 * Download the QR code as PNG
 */
function downloadQR() {
    const qrElement = qrContainer.querySelector(".qr-frame");
    if (!qrElement) return;

    html2canvas(qrElement).then(canvas => {
        const link = document.createElement("a");
        link.download = "QR-Studio.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

/**
 * Clear the QR code preview
 */
function clearQR() {
    qrContainer.innerHTML = `<p>Your QR code will appear here</p>`;
}

/**
 * Update QR live when customization changes
 */
function liveUpdate() {
    const inputField = dynamicFields.querySelector("input, textarea");
    if (!inputField || inputField.value.trim() === "") return;
    generateQR();
}

/* ===== DYNAMIC INPUTS BASED ON QR TYPE ===== */
function renderDynamicFields(type) {
    dynamicFields.innerHTML = "";

    switch(type) {
        case "text":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>Enter Text / URL</label>
                <input type="text" placeholder="https://example.com">
            </div>`;
            break;
        case "email":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="example@email.com">
            </div>
            <div class="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Subject">
            </div>`;
            break;
        case "phone":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91XXXXXXXXXX">
            </div>`;
            break;
        case "whatsapp":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>WhatsApp Number</label>
                <input type="tel" placeholder="91XXXXXXXXXX">
            </div>
            <div class="form-group">
                <label>Message</label>
                <input type="text" placeholder="Hello">
            </div>`;
            break;
        case "upi":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>UPI ID</label>
                <input type="text" placeholder="name@bank">
            </div>
            <div class="form-group">
                <label>Payee Name</label>
                <input type="text" placeholder="Your Name">
            </div>
            <div class="form-group">
                <label>Amount (Optional)</label>
                <input type="number" placeholder="100">
            </div>`;
            break;
        case "wifi":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>WiFi Name (SSID)</label>
                <input type="text" placeholder="WiFi Name">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" placeholder="Password">
            </div>`;
            break;
        case "location":
            dynamicFields.innerHTML = `<div class="form-group">
                <label>Latitude</label>
                <input type="text" placeholder="28.7041">
            </div>
            <div class="form-group">
                <label>Longitude</label>
                <input type="text" placeholder="77.1025">
            </div>`;
            break;
        default:
            dynamicFields.innerHTML = `<div class="form-group">
                <label>Enter Text / URL</label>
                <input type="text" placeholder="https://example.com">
            </div>`;
    }
}

/* ===== EVENT LISTENERS ===== */
document.addEventListener("DOMContentLoaded", () => {
    // Initial render
    renderDynamicFields("text");

    // QR Type Change
    qrTypeSelect.addEventListener("change", () => {
        renderDynamicFields(qrTypeSelect.value);
    });

    // Generate Button
    generateBtn.addEventListener("click", generateQR);

    // Download Button
    downloadBtn.addEventListener("click", downloadQR);

    // Clear Button
    clearBtn.addEventListener("click", clearQR);

    // Live update for customization
    fgColorInput.addEventListener("input", liveUpdate);
    bgColorInput.addEventListener("input", liveUpdate);
    qrSizeInput.addEventListener("input", () => {
        sizeValueDisplay.innerText = qrSizeInput.value + "px";
        liveUpdate();
    });
    dotStyleSelect.addEventListener("change", liveUpdate);
    frameTextInput.addEventListener("input", liveUpdate);
    frameColorInput.addEventListener("input", liveUpdate);
    gradientToggle.addEventListener("change", liveUpdate);
    glowToggle.addEventListener("change", liveUpdate);
    radiusRange.addEventListener("input", liveUpdate);

    // Logo live preview
    logoInput.addEventListener("change", liveUpdate);
});
