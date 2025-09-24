class CheeseRadar {
    constructor() {
        this.cheeseImages = [
            'https://i.imgur.com/f7NkqS5.png', 
            'https://i.imgur.com/pg9r2Yg.png', 
            'https://i.imgur.com/izoP7m9.png'
        ];

        this.cheeses = [];
        this.cheeseIdCounter = 0;
        
        this.radarBackground = document.getElementById('radarBackground');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.radarBackground.addEventListener('click', (event) => {
            this.handleRadarClick(event);
        });
        
        this.radarBackground.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.handleRadarClick(event.touches[0]);
        });
    }
    
    handleRadarClick(event) {
        const rect = this.radarBackground.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        
        const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
        const radius = rect.width / 2;
        
        if (distance <= radius) {
            const angle = Math.random() * 2 * Math.PI;
            const pingDistance = Math.random() * (radius * 0.8);
            const pingX = centerX + Math.cos(angle) * pingDistance;
            const pingY = centerY + Math.sin(angle) * pingDistance;
            
            this.createPing(pingX, pingY);
            this.spawnCheese();
        }
    }
    
    createPing(x, y) {
        const ping = document.createElement('div');
        ping.className = 'ping';
        ping.style.left = (x - 2) + 'px';
        ping.style.top = (y - 2) + 'px';
        this.radarBackground.appendChild(ping);
        
        setTimeout(() => {
            ping.remove();
        }, 2000);
    }
    
    spawnCheese() {
        const randomIndex = Math.floor(Math.random() * this.cheeseImages.length);
        const cheeseImage = this.cheeseImages[randomIndex];
        
        const cheese = document.createElement('div');
        cheese.className = 'cheese spawn';
        cheese.dataset.id = this.cheeseIdCounter++;
        
        const img = document.createElement('img');
        img.src = cheeseImage;
        cheese.appendChild(img);
        
        const rect = this.radarBackground.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * (Math.min(rect.width, rect.height) * 0.25);
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        cheese.style.left = (x - 40) + 'px';
        cheese.style.top = (y - 40) + 'px';
        
        cheese.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeCheese(cheese);
        });
        
        cheese.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            this.removeCheese(cheese);
        });
        
        this.radarBackground.appendChild(cheese);
        this.cheeses.push(cheese);
        
        setTimeout(() => {
            cheese.classList.remove('spawn');
            cheese.classList.add('moving');
        }, 500);
    }
    
    removeCheese(cheese) {
        const index = this.cheeses.indexOf(cheese);
        if (index > -1) {
            this.cheeses.splice(index, 1);
        }
        cheese.remove();
    }
}

// init dom when is loaded:
// reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
    new CheeseRadar();
});