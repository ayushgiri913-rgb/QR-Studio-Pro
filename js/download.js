/* ===== DOWNLOAD.JS – PROFESSIONAL QR DOWNLOAD LOGIC ===== */

/**
 * Function to download the QR code as PNG
 */
function downloadQR() {
    const qrFrame = document.querySelector("#qrPreview .qr-frame");

    if (!qrFrame) {
        alert("Please generate a QR code first!");
        return;
    }

    // Use html2canvas to render QR + frame + logo + text
    html2canvas(qrFrame, { backgroundColor: null, scale: 2 })
        .then(canvas => {
            const dataURL = canvas.toDataURL("image/png");

            // Create a temporary link and trigger download
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "QR-Studio.png";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error("Error downloading QR code:", error);
            alert("Failed to download QR code. Please try again!");
        });
}

/* ===== EVENT LISTENER ===== */
document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", downloadQR);
    }
});
