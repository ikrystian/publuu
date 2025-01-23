import "./src/styles/main.scss";
import 'offcanvas';



document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");

    function toggleHeaderClass() {
        const isActive = window.scrollY > 200;
        header.classList.toggle("header--active", isActive);
    }

    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const debouncedToggleHeaderClass = debounce(toggleHeaderClass, 100);

    window.addEventListener("scroll", debouncedToggleHeaderClass);

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
        if (isTypingComplete()) {
            setTimeout(erase, pauseBetweenSentences);
        } else {
            appendNextCharacter();
            setTimeout(type, typingSpeed);
        }
    }

    function isTypingComplete() {
        return charIndex >= sentences[sentenceIndex].length;
    }

    function appendNextCharacter() {
        typewriterElement.textContent += sentences[sentenceIndex].charAt(charIndex);
        charIndex++;
    }

    function erase() {
        if (charIndex > 0) {
            updateTextContent();
            charIndex--;
            setTimeout(erase, typingSpeed);
        } else {
            moveToNextSentence();
            setTimeout(type, typingSpeed);
        }
    }

    function updateTextContent() {
        typewriterElement.textContent = sentences[sentenceIndex].substring(0, charIndex - 1);
    }

    function moveToNextSentence() {
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
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
    const closeButton = document.getElementById('close-btn');

    function showMessage() {
        messageDiv.style.display = 'flex';
    }

    function hideMessage() {
        messageDiv.style.display = 'none';
    }

    function handleCloseButtonClick() {
        hideMessage();
        localStorage.setItem('messageShown', 'true');
    }

    function initializeMessageDisplay() {
        if (!localStorage.getItem('messageShown')) {
            showMessage();
            closeButton.addEventListener('click', handleCloseButtonClick);
        } else {
            hideMessage();
        }
    }

    initializeMessageDisplay();
});

