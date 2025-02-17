function playMusic() {
    let audio = document.getElementById("birthdaySong");
    audio.play();
}
let images = [];
for (let i = 1; i <= 30; i++) {
    images.push(`assets/images/m${i}.jpeg`);
}

let currentIndex = 0;
let slideshowElement = document.getElementById("slideshow");

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    slideshowElement.src = images[currentIndex];
}

// Auto-change slides every 3 seconds
setInterval(() => changeSlide(1), 2000);
let surprises = [
    "🎉 You found a secret birthday wish: 'May your day be filled with magic and laughter!' 🥳",
    "🦄 A unicorn appears and grants you a special birthday wish! 🦄💖",
    "🎈 Balloons pop up and shower you with sparkles! ✨🎈",
    "💰 You found a treasure chest full of gifts and love and happiness"
];

function showSurprise(index) {
    document.getElementById("surprise-message").innerText = surprises[index];
}
function createBalloon() {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Randomize position & color
    let colors = ["red", "blue", "green", "yellow", "purple", "pink"];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 100 + "vw";

    document.querySelector(".balloon-container").appendChild(balloon);

    // Remove balloon after animation
    setTimeout(() => {
        balloon.remove();
    }, 6000);
}

// Generate balloons every second
setInterval(createBalloon, 1000);
function createConfetti() {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Randomize position, color, and size
    let colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.width = Math.random() * 8 + 5 + "px";
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

    document.querySelector(".confetti-container").appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Generate confetti every 200ms
setInterval(createConfetti, 200);

function createFirework() {
    let fireworkContainer = document.querySelector(".fireworks-container");

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * (window.innerHeight / 2); // Limit explosions to the top half

    for (let i = 0; i < 20; i++) { // Create 20 sparkles per firework
        let firework = document.createElement("div");
        firework.classList.add("firework");

        // Random position around the explosion point
        let xOffset = (Math.random() - 0.5) * 100;
        let yOffset = (Math.random() - 0.5) * 100;

        firework.style.left = `${x + xOffset}px`;
        firework.style.top = `${y + yOffset}px`;

        // Random colors
        let colors = ["red", "blue", "yellow", "green", "purple", "orange", "pink"];
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        fireworkContainer.appendChild(firework);

        // Remove sparkles after animation
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// Generate a firework every 2 seconds
setInterval(createFirework, 2000);

// Function to blow out the candles and play the birthday song
function blowCandles() {
    // Get the audio element and play the song
    const audioElement = document.getElementById("birthday-Song");

    // Blow out the candles by changing their images
    document.getElementById("candle1").src = "assets/images/candle-out.png";
    document.getElementById("candle2").src = "assets/images/candle-out.png";
    document.getElementById("candle3").src = "assets/images/candle-out.png";

    // Display a wish message
    const wishMessage = document.getElementById("wish-message");
    wishMessage.textContent = "🎉 Happy Birthday! 🎂 Make a wish! 🎉";

    // Play the birthday song if it's not already playing
    if (audioElement.paused) {
        audioElement.play();
    }

    // Optionally, add some fade-in effect for the wish message
    wishMessage.style.opacity = 1;
    wishMessage.style.transition = "opacity 2s ease-in";
}

let basket;
let score = 0;
let gameInterval;
let gameTime = 30; // Game duration in seconds
let gameActive = false;

// Start the game
function startGame() {
    if (gameActive) return;

    gameActive = true;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    basket = document.getElementById("basket");

    // Add event listeners for touch controls
    document.addEventListener("touchmove", moveBasketTouch);

    // Start dropping gifts
    gameInterval = setInterval(dropGift, 1000);

    // End game after gameTime seconds
    setTimeout(endGame, gameTime * 1000);
}

// Move basket with touch
function moveBasketTouch(event) {
    event.preventDefault(); // Prevents scrolling while playing
    let touchX = event.touches[0].clientX; // Get the X position of the touch
    let basketLeft = touchX - basket.offsetWidth / 2; // Center the basket on touch

    // Constrain the basket within the game area
    if (basketLeft < 0) {
        basketLeft = 0;
    } else if (basketLeft > 370) {
        basketLeft = 370;
    }

    basket.style.left = basketLeft + "px";
}

// Drop a gift from a random position
function dropGift() {
    let gameArea = document.getElementById("game-area");
    let gift = document.createElement("div");
    gift.classList.add("gift");

    // Random starting position
    gift.style.left = Math.random() * 370 + "px";
    gift.style.top = "0px";
    gameArea.appendChild(gift);

    // Animate the falling gift
    let fallInterval = setInterval(() => {
        let giftTop = parseInt(gift.style.top);
        let basketLeft = parseInt(basket.style.left);

        // Check if the gift reaches the basket
        if (giftTop >= 360 && Math.abs(parseInt(gift.style.left) - basketLeft) < 50) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;

            // Play catch sound
            let catchSound = document.getElementById("catch-sound");
            catchSound.play();

            clearInterval(fallInterval);
            gift.remove();
        }

        // Remove gifts that fall off screen & play miss sound
        if (giftTop > 400) {
            let missSound = document.getElementById("miss-sound");
            missSound.play();

            clearInterval(fallInterval);
            gift.remove();
        }

        // Move gift down
        gift.style.top = giftTop + 5 + "px";
    }, 50);
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    document.removeEventListener("touchmove", moveBasketTouch);
    alert("🎉 Game Over! Final Score: " + score);
}

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
let isPlaying = false;
const audioElement = document.getElementById("birthdaySong");
const playPauseButton = document.getElementById("playPauseButton");

function toggleMusic() {
    if (isPlaying) {
        audioElement.pause(); // Pause the music
        playPauseButton.textContent = "🎶"; // Change button text to "Play"
    } else {
        audioElement.play(); // Play the music
        playPauseButton.textContent = "⏸️"; // Change button text to "Pause"
    }
    isPlaying = !isPlaying; // Toggle the play/pause state
}
