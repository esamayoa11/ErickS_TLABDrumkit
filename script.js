function playSound(e) {
    const activeSlide = document.querySelector('.carousel-slide.active');
    const key = activeSlide.querySelector(`.key[data-key="${e.keyCode}"]`);
    const audio = activeSlide.querySelector(`audio[data-key="${e.keyCode}"]`);
    
    if (!audio || !key) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// Add transition to keys
function setupKeyListeners() {
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(key => key.addEventListener('transitionend', removeTransition));
}

setupKeyListeners();
window.addEventListener('keydown', playSound);

// Carousel code nav
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Ensure slide shows when page loads
showSlide(currentSlide);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Navigation for keyboard 
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});