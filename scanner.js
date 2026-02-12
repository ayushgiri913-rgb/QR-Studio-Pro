/* ===== SCANNER.JS – QR Code Scanner Module ===== */

console.log("QR Scanner Module Loaded");

// DOM elements
const qrScanBtn = document.getElementById("scanBtn"); // अगर HTML में बटन है
const qrPreviewContainer = document.getElementById("qrPreview");
const dynamicFields = document.getElementById("dynamicFields");

// Video element for camera preview
let video = null;
let scanning = false;

// Function to initialize scanner
function initScanner() {
    // Create video element dynamically if not exist
    if (!video) {
        video = document.createElement("video");
        video.setAttribute("id", "qrScannerVideo");
        video.style.width = "100%";
        video.style.borderRadius = "16px";
        qrPreviewContainer.innerHTML = ""; // Clear previous QR
        qrPreviewContainer.appendChild(video);
    }

    // Access camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required for iOS
            video.play();
            scanning = true;
            requestAnimationFrame(scanFrame);
        })
        .catch(err => {
            console.error("Camera access denied or not available", err);
            alert("Unable to access camera for scanning. Please allow camera access.");
        });
}

// Function to scan each video frame
function scanFrame() {
    if (!scanning) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, canvas.width, canvas.height); // using jsQR library

    if (code) {
        scanning = false;
        stopScanner();
        displayScanResult(code.data);
        return;
    }

    requestAnimationFrame(scanFrame);
}

// Function to stop scanner
function stopScanner() {
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
    scanning = false;
}

// Function to display scanned QR result
function displayScanResult(data) {
    qrPreviewContainer.innerHTML = `
        <div class="qr-scan-result">
            <h3>Scanned QR Code:</h3>
            <p>${data}</p>
        </div>
    `;
    console.log("Scanned QR Data:", data);
}

// Attach event listener to Scan button
if (qrScanBtn) {
    qrScanBtn.addEventListener("click", () => {
        initScanner();
    });
}

/* ===== Optional: Auto start scanner if needed ===== */
/*
document.addEventListener("DOMContentLoaded", () => {
    initScanner();
});
*/