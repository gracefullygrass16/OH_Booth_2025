// Existing button count logic
var count = 0;
var button = document.getElementById("yay-button");
var countDisplay = document.getElementById("count");
button.addEventListener("click", function () {
    count++;
    countDisplay.innerHTML = "x" + count;
    triggerConfetti(button); // Pass the button as the origin for confetti
});

// Confetti logic starts here
let canvas = document.createElement("canvas");
canvas.id = "confetti-canvas";
document.body.appendChild(canvas);

let context = canvas.getContext("2d");
let particles = [];
let colors = ["#141b41", "#306bac", "#6f9ceb", "#98b9f2", "#918ef4"];
let width = window.innerWidth;
let height = window.innerHeight;

// Resize canvas to match screen size
canvas.width = width;
canvas.height = height;

// Utility function: Generate random number between range
function randomNumberGenerator(min, max) {
    return Math.random() * (max - min) + min;
}

// Particle constructor
function Particle(x, y) {
    this.x = x; // Starting x position (button center)
    this.y = y; // Starting y position (button center)
    this.size = randomNumberGenerator(2, 6);
    this.color = colors[Math.floor(randomNumberGenerator(0, colors.length))];
    this.speedX = randomNumberGenerator(-5, 5);
    this.speedY = randomNumberGenerator(-5, 5);
    this.gravity = 0.1; // Simulates falling effect
}

// Particle methods
Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity; // Apply gravity
    this.size *= 0.96; // Gradually shrink particles
};

Particle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
};

// Function to trigger confetti
function triggerConfetti(button) {
    // Get button position and size so confetti originates from button location
    let buttonBounds = button.getBoundingClientRect();
    let buttonCenterX = buttonBounds.x + buttonBounds.width / 2;
    let buttonCenterY = buttonBounds.y + buttonBounds.height / 2;

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(buttonCenterX, buttonCenterY)); // Origin is button center
    }

    if (particles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Function to animate confetti
function animateConfetti() {
    context.clearRect(0, 0, width, height); // Clear canvas
    particles = particles.filter(particle => particle.size > 0.5); // Remove small particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    if (particles.length > 0) {
        requestAnimationFrame(animateConfetti); // Continue animation
    }
}

// Adjust canvas size on window resize
window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});


/* for reference: original button code: https://codingartistweb.com/2023/11/confetti-on-button-click/
html:

  <body>
    <div class="container">
      <canvas id="canvas">Canvas is not supported in your browser</canvas>
    </div>
    <button id="display-confetti">Click Me!</button>
  </body>


js:

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let clicked = false;
let displayButton = document.getElementById("display-confetti");
let particles = [];
let colors = ["#141b41", "306bac", "#6f9ceb", "#98b9f2", "#918ef4"];

//Events object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmovve",
    up: "touchend",
  },
};

let deviceType = "";
//Detect touch device
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//For using request animationFrame on all browsers
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequesetAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

//Random number between range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

function startConfetti() {
  let current = [];
  context.fillStyle = "rgba(255,255,255,1)";
  context.fillRect(0, 0, width, height);
  if (clicked) {
    createConfetti();
  }
  for (let i in particles) {
    particles[i].draw();
    if (particles[i].move()) {
      current.push(particles[i]);
    }
  }

  particles = current;
  window.requestAnimationFrame(startConfetti);
}

function createConfetti() {
  //Increase range for bigger confetti;
  let numberOfParticles = randomNumberGenerator(10, 20);
  let color = colors[Math.floor(randomNumberGenerator(0, colors.length))];
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle();
    particle.color = color;
    particles.push(particle);
  }
}

function Particle() {
  let buttonBounds = displayButton.getBoundingClientRect();
  this.width = randomNumberGenerator(0.1, 0.9) * 5;
  this.height = randomNumberGenerator(0.1, 0.9) * 5;
  this.x = buttonBounds.x + buttonBounds.width / 2;
  this.y = buttonBounds.y + buttonBounds.height / 2;
  let angle = Math.random() * Math.PI * 2;
  let speed = randomNumberGenerator(1, 5);
  this.vx = Math.cos(angle) * speed;
  this.vy = Math.sin(angle) * speed;
}

Particle.prototype = {
  move: function () {
    if (this.x >= canvas.width || this.y >= canvas.height) {
      return false;
    }
    return true;
  },
  draw: function () {
    this.x += this.vx;
    this.y += this.vy;
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.arc(0, 0, this.width, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.closePath();
    context.fill();
    context.restore();
  },
};

isTouchDevice();
displayButton.addEventListener(events[deviceType].down, function (e) {
  e.preventDefault();
  clicked = true;
});

displayButton.addEventListener(events[deviceType].up, function (e) {
  e.preventDefault();
  clicked = false;
});

window.onload = () => {
  canvas.width = width;
  canvas.height = height;
  window.requestAnimationFrame(startConfetti);
};

*/
