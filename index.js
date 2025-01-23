import "./src/styles/main.scss";
import 'offcanvas';

window.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    if (window.scrollY > 200) {
        header.classList.add("header--active");
    } else {
        header.classList.remove("header--active");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const sentences = [
        "4002/120275",
        "1234/658744",
    ];

    const typewriterElement = document.getElementById('typewriter');
    let sentenceIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100;
    let pauseBetweenSentences = 1500;

    function type() {
        if (charIndex < sentences[sentenceIndex].length) {
            typewriterElement.textContent += sentences[sentenceIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, pauseBetweenSentences);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = sentences[sentenceIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, typingSpeed);
        } else {
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            setTimeout(type, typingSpeed);
        }
    }

    type();

    document.querySelector('#off-canvas-menu').appendChild(document.querySelector(".main-nav ul").cloneNode(true));

    const sections = document.querySelectorAll('section:not(.hero-section)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    });

    sections.forEach((section) => {
        observer.observe(section);
    });

    const buttons = document.querySelectorAll(".tabs__button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("tabs__button--active"));

            button.classList.add("tabs__button--active");
            contents.forEach(content => content.classList.add("hidden"));
            const contentToShow = document.querySelector(`#content${index + 1}`);
            contentToShow.classList.remove("hidden");
        });
    });

    document.getElementById('confettiButton').addEventListener('click', createConfetti);

    function createConfetti() {
        const colors = ['#FF0B0B', '#0BFF0B', '#0B0BFF', '#FF0BFF', '#FFFF0B'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 2 + 1 + 's'; // Random duration between 1s and 3s
            confetti.style.opacity = Math.random();

            document.getElementById('confettiContainer').appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    const messageDiv = document.getElementById('message');
    if (!localStorage.getItem('messageShown')) {
        messageDiv.style.display = 'flex';

        document.getElementById('close-btn').addEventListener('click', function() {
            messageDiv.style.display = 'none';
            localStorage.setItem('messageShown', 'true');
        });
    } else {
        messageDiv.style.display = 'none';
    }
});

