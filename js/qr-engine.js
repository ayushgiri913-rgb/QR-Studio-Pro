/* ===== QR ENGINE.JS – QR CODE GENERATION LOGIC ===== */

console.log("QR Engine Loaded");

// Global QR instance
let qrCodeInstance = null;

/**
 * Function to get logo image URL if uploaded
 */
function getLogo() {
    const logoInput = document.getElementById("logoUpload");
    if (logoInput && logoInput.files && logoInput.files.length > 0) {
        return URL.createObjectURL(logoInput.files[0]);
    }
    return null;
}

/**
 * Main function to generate QR code
 */
function generateQR() {
    const qrContainer = document.getElementById("qrPreview");
    const textInput = document.querySelector("#dynamicFields input");

    if (!textInput || textInput.value.trim() === "") {
        alert("Please enter valid data");
        return;
    }

    const qrText = textInput.value.trim();
    const fgColor = document.getElementById("qrColor")?.value || "#000000";
    const bgColor = document.getElementById("bgColor")?.value || "#ffffff";
    const qrSize = parseInt(document.getElementById("qrSize")?.value) || 250;
    const frameText = document.getElementById("frameText")?.value || "";
    const dotStyle = document.getElementById("dotStyle")?.value || "square";

    // Frame customizations
    const frameColor = document.getElementById("frameColor")?.value || "#302b63";
    const gradientEnabled = document.getElementById("gradientToggle")?.checked;
    const glowEnabled = document.getElementById("glowToggle")?.checked;
    const radiusValue = parseInt(document.getElementById("radiusRange")?.value) || 20;

    // Clear previous QR
    qrContainer.innerHTML = "";

    // Create Frame Wrapper
    const frame = document.createElement("div");
    frame.className = "qr-frame";

    // Apply frame styles
    frame.style.borderRadius = radiusValue + "px";
    frame.style.background = gradientEnabled
        ? `linear-gradient(135deg, #1e1e3f, ${frameColor})`
        : frameColor;
    if (glowEnabled) {
        frame.style.boxShadow = `0 0 40px ${frameColor}`;
    }

    const qrDiv = document.createElement("div");
    qrDiv.id = "innerQR";

    frame.appendChild(qrDiv);

    // Add frame bottom text if exists
    if (frameText !== "") {
        const textEl = document.createElement("div");
        textEl.className = "qr-bottom-text";
        textEl.innerText = frameText;
        textEl.style.textAlign = "center";
        textEl.style.marginTop = "10px";
        frame.appendChild(textEl);
    }

    qrContainer.appendChild(frame);

    // Generate QR using QRCodeStyling
    qrCodeInstance = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        data: qrText,
        image: getLogo(),
        dotsOptions: {
            color: fgColor,
            type: dotStyle
        },
        backgroundOptions: {
            color: bgColor
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 5
        }
    });

    qrCodeInstance.append(qrDiv);
}

/* ===== EVENT LISTENERS ===== */
document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (generateBtn) generateBtn.addEventListener("click", generateQR);

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            const qrContainer = document.getElementById("qrPreview");
            qrContainer.innerHTML = "<p>Your QR code will appear here</p>";
        });
    }
});
