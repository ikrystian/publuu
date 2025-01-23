import "./src/styles/main.scss";

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
});

window.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    if (window.scrollY > 200) {
        header.classList.add("header--active");
    } else {
        header.classList.remove("header--active");
    }
})