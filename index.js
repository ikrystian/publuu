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
});

