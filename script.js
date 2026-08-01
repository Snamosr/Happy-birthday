const colors = ['#38bdf8', '#fb923c', '#f43f5e', '#c084fc', '#4ade80', '#facc15'];
let spawningBalloons = false;

// Function called when the user clicks the "Open Birthday Card" button
function startCard() {
    const overlay = document.getElementById('overlay');
    const card = document.getElementById('birthday-card');
    const tray = document.getElementById('tray-img');
    const music = document.getElementById('bg-music');

    // 1. Play the music file
    music.play().catch(error => console.log("Audio play failed:", error));

    // 2. Hide overlay and reveal card
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.1)';
    setTimeout(() => overlay.remove(), 800);
    tray.classList.add('reveal');
    card.classList.add('reveal');
    // 3. Start balloon generation loop
    spawningBalloons = true;
    setInterval(() => {
        if(spawningBalloons) createBalloon();
    }, 1000);
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;
    balloon.style.color = randomColor;
    balloon.style.left = Math.random() * 92 + 'vw';
    
    const sizeModifier = 0.75 + Math.random() * 0.5;
    balloon.style.transform = `scale(${sizeModifier})`;
    balloon.style.animationDuration = (5.5 + Math.random() * 4) + 's';
    
    balloon.addEventListener('click', () => {
        createPoppedParticles(balloon.offsetLeft, balloon.offsetTop, randomColor);
        balloon.remove();
    });
    
    document.tray.appendChild(balloon);
    setTimeout(() => { balloon.remove(); }, 10000);
}

function createPoppedParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 30 + 'px';
        particle.style.top = y + 30 + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '5';
        
        const angle = (i / 10) * Math.PI * 2;
        const velocity = 3 + Math.random() * 5;
        
        document.body.appendChild(particle);
        
        let localX = 0;
        let localY = 0;
        let opacity = 1;
        
        const anim = setInterval(() => {
            localX += Math.cos(angle) * velocity;
            localY += Math.sin(angle) * velocity + 0.4;
            opacity -= 0.04;
            
            particle.style.transform = `translate(${localX}px, ${localY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(anim);
                particle.remove();
            }
        }, 16);
    }
}