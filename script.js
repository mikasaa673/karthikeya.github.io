// Global Variables
let soundEnabled = false;
let noButtonHoverCount = 0;
let currentSection = 0;
const sections = ['introSection', 'messageSection', 'questionSection'];

// DOM Elements
const hiBtn = document.getElementById('hiBtn');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.querySelector('.sound-icon');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const scrollIndicators = document.querySelectorAll('.scroll-indicator');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initButtonInteractions();
    initSoundToggle();
    createFloatingHearts();
});



// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                currentSection = sections.indexOf(entry.target.id);
            }
        });
    }, observerOptions);
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });
}

// Button Interactions
function initButtonInteractions() {
    // HI Button - Navigate to page2
    if (hiBtn) {
        hiBtn.addEventListener('click', () => {
            window.location.href = 'page2.html';
            playSound('success');
        });
    }
    
    // Next Button - Navigate to page3
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            window.location.href = 'page3.html';
            playSound('success');
        });
    }
    
    // Back Button - Navigate to page3
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'page3.html';
            playSound('success');
        });
    }
    
    // YES / NO Buttons (only if present on this page)
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Directly go to happy page, no celebration effects
            window.location.href = 'happy.html';
        });
    }
    
    if (noBtn) {
        // NO Button - Playful behavior
        noBtn.addEventListener('mouseenter', (e) => {
            moveNoButton(e);
            noButtonHoverCount++;
            
            if (noButtonHoverCount >= 6) {
                noBtn.textContent = "Yes of course 😌";
                noBtn.classList.remove('no-btn');
                noBtn.classList.add('yes-btn');
                
                // After enough teasing, send to the please page
                setTimeout(() => {
                    window.location.href = 'please.html';
                }, 1000);
            }
        });
        
        // Touch support for mobile
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton(e);
            noButtonHoverCount++;
            
            if (noButtonHoverCount >= 6) {
                noBtn.textContent = "Yes of course 😌";
                noBtn.classList.remove('no-btn');
                noBtn.classList.add('yes-btn');
                
                setTimeout(() => {
                    window.location.href = 'please.html';
                }, 1000);
            }
        });
    }
    
    // Close Modal (only if modal exists on this page)
    if (closeModal && successModal) {
        closeModal.addEventListener('click', () => {
            successModal.classList.remove('show');
        });
        
        // Close modal on background click
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
}

// Move NO Button Away from Cursor
function moveNoButton(event) {
    const button = event.target;
    const area = document.querySelector('.floating-container');
    const areaRect = area.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();
    
    const padding = 20; // keeps it from edges
    
    const maxX = areaRect.width - btnRect.width - padding;
    const maxY = areaRect.height - btnRect.height - padding;
    
    const x = Math.random() * maxX + padding;
    const y = Math.random() * maxY + padding;
    
    button.style.transform = `translate(${x}px, ${y}px)`;
}

// Success Celebration
function celebrateSuccess() {
    // Show modal
    successModal.classList.add('show');
    
    // Create confetti
    createConfetti();
    
    // Create extra hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSingleHeart();
        }, i * 100);
    }
}

// Confetti Animation
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ffd6e7', '#ffeef8'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Floating Hearts Background
function createFloatingHearts() {
    // Create initial hearts (more for stronger effect)
    for (let i = 0; i < 28; i++) {
        setTimeout(() => {
            createSingleHeart();
        }, i * 2000);
    }
    
    // Continue creating hearts
    setInterval(() => {
        createSingleHeart();
    }, 1600);
}

function createSingleHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
    heart.style.fontSize = (Math.random() * 18 + 22) + 'px';
    heart.style.opacity = Math.random() * 0.4 + 0.6;
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 20000);
}



// Play Sound (placeholder for actual sound implementation)
function playSound(type) {
    if (!soundEnabled) return;
    
    // Create audio context for simple sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'success':
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
            
        case 'toggle':
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
            
        case 'hover':
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
    }
}

// Scroll Indicators
function initScrollIndicators() {
    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            scrollToNextSection();
        });
    });
    
    // Add hover sound to indicators
    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('mouseenter', () => {
            playSound('hover');
        });
    });
}

// Scroll to Next Section
function scrollToNextSection() {
    if (currentSection < sections.length - 1) {
        const nextSection = document.getElementById(sections[currentSection + 1]);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            scrollToNextSection();
            break;
        case 'ArrowUp':
            e.preventDefault();
            scrollToPreviousSection();
            break;
        case 'Escape':
            if (successModal.classList.contains('show')) {
                successModal.classList.remove('show');
            }
            break;
    }
});

// Scroll to Previous Section
function scrollToPreviousSection() {
    if (currentSection > 0) {
        const prevSection = document.getElementById(sections[currentSection - 1]);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Touch/Swipe Support
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - next section
            scrollToNextSection();
        } else {
            // Swipe down - previous section
            scrollToPreviousSection();
        }
    }
}

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Performance optimization - throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Handle scroll-based animations if needed
    });
});

// Play Background Music
function playBackgroundMusic() {
    // If a dedicated background <audio> element is present (like on page3),
    // use that so paths and settings live in HTML.
    const element = document.getElementById('bgMusic');
    if (element) {
        element.loop = true;
        element.volume = 0.3;

        const startMusic = () => {
            // Always restart from the beginning on (re)load / interaction
            try {
                element.currentTime = 0;
            } catch (e) {}
            element.play().catch(error => {
                console.log('Background music could not be played:', error);
            });
        };

        // Try to play immediately (may be blocked by browser)
        startMusic();

        // Also start on any user interaction (in case autoplay is blocked)
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
        document.addEventListener('mousemove', startMusic, { once: true });
        return;
    }

    // Fallback: create an Audio instance if no element is defined
    const audio = new Audio('music.mp3');
    audio.loop = true;
    audio.volume = 0.3;

    const startMusic = () => {
        try {
            audio.currentTime = 0;
        } catch (e) {}
        audio.play().catch(error => {
            console.log('Background music could not be played:', error);
        });
    };

    startMusic();
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
    document.addEventListener('mousemove', startMusic, { once: true });
}

// Easter Egg: Type "i love you"
let typedSequence = '';

document.addEventListener('keydown', (e) => {
    // Only track letter keys (ignore modifiers, arrows, etc.)
    if (e.key.length === 1) {
        typedSequence += e.key.toLowerCase();
        
        // Keep only the last 11 characters (length of "i love you")
        if (typedSequence.length > 11) {
            typedSequence = typedSequence.slice(-11);
        }
        
        // Check if the sequence contains "i love you"
        if (typedSequence.includes('iloveyou')) {
            activateEasterEgg();
            typedSequence = ''; // Reset after activation
        }
    }
});

function activateEasterEgg() {
    // Create rainbow confetti explosion
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.width = (Math.random() * 15 + 5) + 'px';
            confetti.style.height = (Math.random() * 15 + 5) + 'px';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 10);
    }
    
    // Show special message
    const specialMessage = document.createElement('div');
    specialMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 2rem;
        z-index: 10000;
        animation: fadeInUp 0.5s ease;
        text-align: center;
    `;
    specialMessage.innerHTML = ' You found the easter egg!! <br>Sarayuu is amazing! mwahhhhh';
    document.body.appendChild(specialMessage);
    
    setTimeout(() => {
        specialMessage.remove();
    }, 3000);
}
