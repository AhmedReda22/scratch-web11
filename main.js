let canvas = document.getElementById("scratch-card1");
let context = canvas.getContext("2d");

const init = () => {
    let img = new Image();
    img.onload = function() {
        canvas.width = window.innerWidth; // Adjust canvas width to match window width
        canvas.height = window.innerHeight; // Adjust canvas height to match window height
        let x = (canvas.width - img.width) / 2; // Calculate x position to center the image
        let y = (canvas.height - img.height) / 2; // Calculate y position to center the image
        context.drawImage(img, x, y); // Draw image at calculated position
    };
    img.src = './images/layer1.jpg'; 
}

let isHovering = false;

const scratch = (x, y) => {
    if (isHovering) {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, 48, 0, 2 * Math.PI); // Increase the radius to make the brush bigger
        context.fill();
    }
};

canvas.addEventListener("mouseenter", () => {
    isHovering = true;
    canvas.addEventListener("mousemove", scratchOnHover);
});

canvas.addEventListener("mouseleave", () => {
    isHovering = false;
    canvas.removeEventListener("mousemove", scratchOnHover);
});

function scratchOnHover(event) {
    scratch(event.offsetX, event.offsetY);
}

// Touch event listeners
canvas.addEventListener("touchstart", (event) => {
    isHovering = true;
    event.preventDefault(); // Prevent default touch behavior
    scratchOnTouch(event);
});

canvas.addEventListener("touchmove", (event) => {
    event.preventDefault(); // Prevent default touch behavior
    scratchOnTouch(event);
});

canvas.addEventListener("touchend", () => {
    isHovering = false;
});

function scratchOnTouch(event) {
    let touch = event.touches[0]; // Get the first touch
    let rect = canvas.getBoundingClientRect(); // Get the position of the canvas
    let x = touch.clientX - rect.left; // Calculate x position relative to the canvas
    let y = touch.clientY - rect.top; // Calculate y position relative to the canvas
    scratch(x, y);
}

window.addEventListener("resize", () => {
    init();
});

init();

document.getElementById("altTabButton").addEventListener("click", function() {
    triggerAltTab();
});

function triggerAltTab() {
    var event = new KeyboardEvent("keydown", {
        key: "Tab",
        code: "Tab",
        altKey: true
    });
    document.dispatchEvent(event);
}
