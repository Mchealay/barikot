// Create balloons
function createBalloons() {
    const colors = ['#ff6b6b', '#ff8e8e', '#f9c5d1', '#f2a6c2'];
    const balloonCount = 10;

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = (Math.random() * 10 + 5) + 's';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.opacity = 0.7 + Math.random() * 0.3;
        balloon.style.transform = 'scale(' + (0.5 + Math.random()) + ')';

        balloon.addEventListener('click', function () {
            popBalloon(balloon);
        });

        balloon.addEventListener('touchend', function (e) {
            e.preventDefault();
            popBalloon(balloon);
        });

        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 15000);
    }
}

// Pop balloon
function popBalloon(balloon) {
    const popSound = document.getElementById('popSound');
    popSound.currentTime = 0;
    popSound.play();

    balloon.style.animation = 'none';
    balloon.style.transition = 'transform 0.2s, opacity 0.2s';
    balloon.style.transform = 'scale(1.5)';
    balloon.style.opacity = '0';

    setTimeout(() => {
        balloon.remove();
    }, 200);
}

// Show birthday message
function showBirthdayMessage() {
    const message = document.getElementById('birthdayMessage');
    const sound = document.getElementById('birthdaySound');
    const giggle = document.getElementById('giggleSound');

    message.style.display = 'block';
    sound.currentTime = 0;
    sound.play();

    setTimeout(() => {
        giggle.currentTime = 0;
        giggle.play();
    }, 1500);

    createConfetti();

    // Scroll to 6 month card
    document.getElementById('month6').scrollIntoView({ behavior: 'smooth' });
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#ff8e8e', '#f9c5d1', '#f2a6c2', '#ffef00'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.transition = 'all 1s';
            confetti.style.opacity = '1';
            confetti.style.transform = 'translate(' + (Math.random() * 200 - 100) + 'px, ' + (Math.random() * 200 + 100) + 'px) rotate(' + (Math.random() * 360) + 'deg)';

            setTimeout(() => {
                confetti.style.opacity = '0';
                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }, 2000);
        }, 0);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add full-screen viewer functionality
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const fullscreenDownload = document.getElementById('fullscreenDownload');
const fullscreenClose = document.getElementById('fullscreenClose');

// Function to open full-screen viewer
function openFullscreen(imageSrc) {
    fullscreenImage.src = imageSrc;
    fullscreenDownload.href = imageSrc;
    fullscreenViewer.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close full-screen viewer
function closeFullscreen() {
    fullscreenViewer.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Add click event listeners to all photo containers
document.querySelectorAll('.photo-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Don't open fullscreen if clicking the download button
        if (!e.target.closest('.download-btn')) {
            const img = container.querySelector('img');
            if (img) {
                openFullscreen(img.src);
            }
        }
    });
});

// Close fullscreen when clicking the close button
fullscreenClose.addEventListener('click', closeFullscreen);

// Close fullscreen when clicking outside the image
fullscreenViewer.addEventListener('click', (e) => {
    if (e.target === fullscreenViewer) {
        closeFullscreen();
    }
});

// Close fullscreen when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenViewer.style.display === 'flex') {
        closeFullscreen();
    }
});

// Create golden balloons
function createGoldenBalloons() {
    const balloonCount = 5;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'golden-balloon';
        
        // Random starting position
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration and delay
        balloon.style.animationDuration = (Math.random() * 10 + 15) + 's';
        balloon.style.animationDelay = (Math.random() * 10) + 's';
        
        // Add sparkles
        for (let j = 0; j < 3; j++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = (Math.random() * 1.5) + 's';
            balloon.appendChild(sparkle);
        }
        
        document.body.appendChild(balloon);
        
        // Remove balloon after animation completes
        setTimeout(() => {
            balloon.remove();
        }, 25000);
    }
}

// Initialize golden balloons
function initGoldenBalloons() {
    createGoldenBalloons();
    // Create new balloons every 20 seconds
    setInterval(createGoldenBalloons, 20000);
}

// Initialize
window.onload = function () {
    createBalloons();
    initGoldenBalloons();

    const surpriseBtn = document.getElementById('surpriseBtn');
    const closeBtn = document.getElementById('closeBtn');

    // Modified event listeners for better mobile support
    surpriseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showBirthdayMessage();
    });

    // Add touchstart event listener
    surpriseBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        showBirthdayMessage();
    }, { passive: false });

    closeBtn.addEventListener('click', function () {
        document.getElementById('birthdayMessage').style.display = 'none';
        // Scroll back to the top where the surprise button is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    closeBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        document.getElementById('birthdayMessage').style.display = 'none';
        // Scroll back to the top where the surprise button is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, { passive: false });

    // Download functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const imageUrl = this.getAttribute('href');
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = imageUrl.split('/').pop(); // Get filename from URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Show more/less functionality
    document.addEventListener('DOMContentLoaded', function () {
        const showMoreButtons = document.querySelectorAll('.show-more-btn');

        showMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const descriptionText = this.previousElementSibling;
                const isExpanded = descriptionText.classList.contains('expanded');

                if (isExpanded) {
                    descriptionText.classList.remove('expanded');
                    this.textContent = 'ተወሳኺ ኣርኢ';
                    this.classList.remove('expanded');
                } else {
                    descriptionText.classList.add('expanded');
                    this.textContent = 'ንኣሽቱ ኣርኢ';
                    this.classList.add('expanded');
                }
            });
        });
    });
}; 