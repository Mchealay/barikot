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

// Initialize
window.onload = function () {
    createBalloons();

    const surpriseBtn = document.getElementById('surpriseBtn');
    const closeBtn = document.getElementById('closeBtn');

    surpriseBtn.addEventListener('click', function () {
        showBirthdayMessage();
    });

    surpriseBtn.addEventListener('touchend', function (e) {
        e.preventDefault();
        showBirthdayMessage();
    });

    closeBtn.addEventListener('click', function () {
        document.getElementById('birthdayMessage').style.display = 'none';
        // Scroll back to the top where the surprise button is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    closeBtn.addEventListener('touchend', function (e) {
        e.preventDefault();
        document.getElementById('birthdayMessage').style.display = 'none';
        // Scroll back to the top where the surprise button is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.addEventListener('touchstart', function (e) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    surpriseBtn.addEventListener('touchstart', function () {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

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