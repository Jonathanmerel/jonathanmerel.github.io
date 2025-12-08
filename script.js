// script.js - Stranger Things Pentesting Effects

// Three.js Background
let scene, camera, renderer, particles;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bg-canvas'), 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create glowing particles
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        
        // Stranger Things colors
        const colorChoice = Math.random();
        if (colorChoice < 0.3) {
            colors[i * 3] = 1.0;     // R (Red)
            colors[i * 3 + 1] = 0.0; // G
            colors[i * 3 + 2] = 0.2; // B
        } else if (colorChoice < 0.6) {
            colors[i * 3] = 0.0;     // R
            colors[i * 3 + 1] = 0.9; // G (Cyan)
            colors[i * 3 + 2] = 1.0; // B
        } else {
            colors[i * 3] = 0.6;     // R
            colors[i * 3 + 1] = 0.0; // G
            colors[i * 3 + 2] = 1.0; // B (Purple)
        }
        
        sizes[i] = Math.random() * 2 + 0.5;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 50;
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0007;
    
    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i * 0.01) * 0.02;
        positions[i + 2] += Math.cos(time + i * 0.01) * 0.01;
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px 'Share Tech Mono'`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillStyle = Math.random() > 0.3 ? '#00FF9D' : '#00E1FF';
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Typewriter Effect
function initTypewriter() {
    const lines = [
        "$ echo 'Welcome to the Upside Down of Cybersecurity'",
        "$ whoami",
        "> Jonathan_Merel - Ethical_Hacker",
        "$ cat skills.txt",
        "> Penetration_Testing | Vulnerability_Analysis | Red_Teaming",
        "$ status --active",
        "> SCANNING... EXPLOITING... SECURING..."
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter');
    
    function type() {
        const currentLine = lines[lineIndex];
        
        if (!isDeleting && charIndex <= currentLine.length) {
            typewriterElement.textContent = currentLine.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 50 + Math.random() * 100);
        } else if (isDeleting && charIndex >= 0) {
            typewriterElement.textContent = currentLine.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 30);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                lineIndex = (lineIndex + 1) % lines.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    setTimeout(type, 1000);
}

// Terminal Commands
function initTerminal() {
    const terminalInput = document.getElementById('hackerInput');
    const terminalOutput = document.querySelector('.terminal-output');
    
    const commands = {
        help: `Available commands:<br>
        - scan: Simulate network scan<br>
        - exploit: Run exploit simulation<br>
        - decode: Decode sample hash<br>
        - report: Generate pentest report<br>
        - clear: Clear terminal<br>
        - whoami: Display user info`,
        
        scan: `> Initiating network scan...<br>
        > Target: 192.168.1.0/24<br>
        > Ports: 1-65535<br>
        > Found 15 active hosts<br>
        > 3 hosts with open ports detected<br>
        > Scan completed in 2.4s`,
        
        exploit: `> Loading exploit database...<br>
        > Target: Apache 2.4.49<br>
        > Exploit: CVE-2021-41773<br>
        > Gaining shell access...<br>
        > Success! Root access obtained<br>
        > Shell: www-data@target:~#`,
        
        decode: `> Hash: 5f4dcc3b5aa765d61d8327deb882cf99<br>
        > Type: MD5<br>
        > Attempting dictionary attack...<br>
        > Cracked! Password: password<br>
        > Time: 0.02s<br>
        > Hashes tried: 134,567`,
        
        report: `> Generating penetration test report...<br>
        > Critical vulnerabilities: 5<br>
        > High vulnerabilities: 8<br>
        > Medium vulnerabilities: 12<br>
        > Report saved as: pentest_report_${Date.now()}.pdf<br>
        > Email sent to client`,
        
        whoami: `> Username: stranger_pentester<br>
        > Role: Ethical Hacker & Security Researcher<br>
        > Specialization: Penetration Testing<br>
        > Location: Digital Underground<br>
        > Status: ACTIVE`
    };
    
    function addOutput(text) {
        const p = document.createElement('p');
        p.innerHTML = text;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.toLowerCase().trim();
            terminalInput.value = '';
            
            addOutput(`<span style="color:#ff003c">$</span> ${command}`);
            
            if (command === 'clear') {
                terminalOutput.innerHTML = '';
                addOutput('> Terminal cleared. Type "help" for commands.');
            } else if (commands[command]) {
                addOutput(commands[command]);
            } else if (command) {
                addOutput(`> Command not found: ${command}<br>> Type "help" for available commands`);
            }
        }
    });
    
    // Lab control buttons
    document.querySelectorAll('.lab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            terminalInput.value = command;
            terminalInput.dispatchEvent(new KeyboardEvent('keypress', {key: 'Enter'}));
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace(/,/g, '');
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Skill meter animations
function initSkillMeters() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach(progress => {
        const level = progress.dataset.level;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress.style.width = `${level}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(progress);
    });
}

// Glitch effects
function initGlitchEffects() {
    // Random glitch text
    setInterval(() => {
        const glitchWords = document.querySelectorAll('.glitch-word');
        glitchWords.forEach(word => {
            word.style.textShadow = `
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff003c,
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #00e1ff
            `;
        });
    }, 100);
    
    // Terminal glitch
    setInterval(() => {
        if (Math.random() > 0.7) {
            document.querySelector('.floating-terminal').style.transform = 
                `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 10 - 5}px)`;
            
            setTimeout(() => {
                document.querySelector('.floating-terminal').style.transform = '';
            }, 50);
        }
    }, 3000);
}

// Form submission
function initForm() {
    const form = document.getElementById('encryptedForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.send-btn');
        const originalText = submitBtn.innerHTML;
        
        // Encryption animation
        submitBtn.innerHTML = '<i class="fas fa-lock"></i> ENCRYPTING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff9d, #00e1ff)';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert-success';
            successMsg.innerHTML = `
                <i class="fas fa-shield-alt"></i>
                <strong>Message Encrypted & Sent!</strong>
                <p>Your secure message has been transmitted via encrypted channel.</p>
            `;
            form.prepend(successMsg);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                successMsg.remove();
            }, 3000);
        }, 1500);
    });
}

// Tool hover effects
function initToolHover() {
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            const toolName = tool.dataset.tool;
            const terminal = document.querySelector('.floating-terminal .terminal-content');
            
            if (terminal) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.textContent = `> Loading ${toolName}...`;
                terminal.appendChild(line);
                terminal.scrollTop = terminal.scrollHeight;
                
                setTimeout(() => {
                    line.textContent = `> ${toolName} loaded successfully`;
                }, 500);
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.stranger-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            rotateX: -10,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'back.out(1.7)'
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js background
    initThreeJS();
    animateParticles();
    
    // Initialize Matrix rain
    initMatrixRain();
    
    // Initialize effects
    initTypewriter();
    initTerminal();
    initCounters();
    initSkillMeters();
    initGlitchEffects();
    initForm();
    initToolHover();
    initScrollAnimations();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.stranger-nav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const toggleButton = document.querySelector('.navbar-toggler');
                    toggleButton.click();
                }
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update Three.js
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Update Matrix canvas
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Activate easter egg
        document.body.classList.add('easter-egg');
        
        // Show secret message
        const secretMsg = document.createElement('div');
        secretMsg.className = 'secret-message';
        secretMsg.innerHTML = `
            <h3><i class="fas fa-user-secret"></i> SECRET MODE ACTIVATED</h3>
            <p>Accessing classified systems...</p>
            <p class="blinking">RED TEAM MODE: ENGAGED</p>
        `;
        document.body.appendChild(secretMsg);
        
        setTimeout(() => {
            secretMsg.remove();
            document.body.classList.remove('easter-egg');
        }, 5000);
        
        konamiCode = [];
    }
});

// threat-system-completo.js - Sistema de Seguridad en Tiempo Real
class ThreatHunterSystem {
    constructor() {
        this.apiBase = 'http://localhost:3000/api';
        this.threats = [];
        this.metrics = {
            blocked: 0,
            active: 0,
            phishing: 0,
            malware: 0,
            maliciousIPs: 0
        };
        this.activityLog = [];
        this.isInitialized = false;
        this.initializeSystem();
    }
    
    async initializeSystem() {
        console.log('🚀 Inicializando Sistema de Caza de Amenazas...');
        
        try {
            // Cargar datos iniciales
            await this.loadInitialThreats();  // Cambié esto - sin Promise.all
            await this.loadInitialMetrics();
            
            // Iniciar monitoreo en tiempo real
            this.startRealTimeMonitoring();
            
            // Configurar actualizaciones automáticas
            setInterval(() => this.updateMetrics(), 15000);
            setInterval(() => this.updateThreatFeed(), 10000);  // Más frecuente
            
            this.isInitialized = true;
            this.addToLog('✅ Sistema de Seguridad Inicializado');
            console.log('✅ Sistema de Seguridad Listo');
            
        } catch (error) {
            console.error('Error inicializando sistema:', error);
            this.addToLog('❌ Error inicializando sistema');
        }
    }
    
    async loadInitialThreats() {
        try {
            console.log('📡 Intentando cargar amenazas desde API...');
            const response = await fetch(`${this.apiBase}/live-threats`);
            const data = await response.json();
            this.threats = data.threats || this.getSampleThreats();
            console.log('✅ Amenazas cargadas:', this.threats.length);
        } catch (error) {
            console.log('⚠️ Usando amenazas de ejemplo (API no disponible):', error.message);
            this.threats = this.getSampleThreats();
        }
        
        // ¡IMPORTANTE! Siempre actualizar el feed después de cargar
        this.updateThreatFeed();
    }
    
    getSampleThreats() {
        return [
            {
                id: 1,
                type: 'phishing',
                severity: 'high',
                source: 'phishing-bank.com',
                target: 'Usuarios bancarios',
                timestamp: new Date().toISOString(),
                description: 'Nuevo sitio de phishing bancario detectado',
                icon: 'fish'
            },
            {
                id: 2,
                type: 'malware',
                severity: 'critical',
                source: 'malware-cdn.net',
                target: 'Sistemas Windows',
                timestamp: new Date(Date.now() - 300000).toISOString(),
                description: 'Ransomware distribuido por email',
                icon: 'virus'
            },
            {
                id: 3,
                type: 'ddos',
                severity: 'medium',
                source: 'Botnet Global',
                target: 'Servidor web',
                timestamp: new Date(Date.now() - 600000).toISOString(),
                description: 'Ataque DDoS detectado y mitigado',
                icon: 'network-wired'
            },
            {
                id: 4,
                type: 'intrusion',
                severity: 'high',
                source: '192.168.50.120',
                target: 'Base de datos',
                timestamp: new Date(Date.now() - 1200000).toISOString(),
                description: 'Intento de acceso no autorizado bloqueado',
                icon: 'user-secret'
            },
            {
                id: 5,
                type: 'phishing',
                severity: 'medium',
                source: 'secure-login-update.org',
                target: 'Credenciales de usuarios',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                description: 'Campaign de phishing dirigida detectada',
                icon: 'fish'
            }
        ];
    }
    
    async loadInitialMetrics() {
        // Datos iniciales con valores aleatorios realistas
        this.metrics = {
            blocked: Math.floor(Math.random() * 1000) + 500,
            active: Math.floor(Math.random() * 100) + 10,
            phishing: Math.floor(Math.random() * 2000) + 1000,
            malware: Math.floor(Math.random() * 1000) + 500,
            maliciousIPs: Math.floor(Math.random() * 10000) + 5000
        };
        
        this.updateMetrics();
    }
    
    startRealTimeMonitoring() {
        // Simular actualizaciones en tiempo real
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.simulateNewThreat();
            }
            this.updateMetrics();
        }, 8000); // Cada 8 segundos
        
        // También actualizar el feed periódicamente
        setInterval(() => {
            this.updateThreatFeed();
        }, 5000);
    }
    
    simulateNewThreat() {
        const threatTypes = [
            { type: 'phishing', icon: 'fish', title: 'PHISHING' },
            { type: 'malware', icon: 'virus', title: 'MALWARE' },
            { type: 'ddos', icon: 'network-wired', title: 'DDoS' },
            { type: 'intrusion', icon: 'user-secret', title: 'INTRUSIÓN' }
        ];
        
        const severities = ['low', 'medium', 'high', 'critical'];
        const targets = ['Servidor Web', 'Base de Datos', 'Email', 'Router', 'Firewall', 'VPN'];
        
        const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        
        const newThreat = {
            id: Date.now(),
            type: randomType.type,
            icon: randomType.icon,
            title: randomType.title,
            severity: randomSeverity,
            source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            target: targets[Math.floor(Math.random() * targets.length)],
            timestamp: new Date().toISOString(),
            description: 'Nueva amenaza detectada en tiempo real'
        };
        
        this.threats.unshift(newThreat);
        
        // Mantener solo las últimas 10 amenazas
        if (this.threats.length > 10) {
            this.threats.pop();
        }
        
        this.addToLog(`⚠️ Nueva amenaza ${newThreat.type} desde ${newThreat.source}`);
        this.updateThreatFeed();
        
        // Actualizar métricas si es crítica
        if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
            this.metrics.active++;
            this.updateMetrics();
            this.showThreatNotification(newThreat);
        }
    }
    
    updateThreatFeed() {
        const feedContainer = document.getElementById('threat-feed');
        
        if (!feedContainer) {
            console.error('❌ ERROR: No se encontró #threat-feed');
            // Intentar encontrarlo de otra forma
            const altContainer = document.querySelector('.feed-container');
            if (altContainer) {
                console.log('✅ Encontrado .feed-container, usando ese');
                this.renderThreatFeed(altContainer);
            }
            return;
        }
        
        this.renderThreatFeed(feedContainer);
    }
    
    renderThreatFeed(container) {
        if (!this.threats || this.threats.length === 0) {
            container.innerHTML = `
                <div class="empty-threats">
                    <i class="fas fa-shield-alt"></i>
                    <p>No hay amenazas activas</p>
                    <small>El sistema está monitoreando...</small>
                </div>
            `;
            return;
        }
        
        const threatsToShow = this.threats.slice(0, 6); // Mostrar solo 6
        const html = threatsToShow.map(threat => this.createThreatHTML(threat)).join('');
        
        container.innerHTML = html;
    }
    
    createThreatHTML(threat) {
        const timeAgo = this.getTimeAgo(threat.timestamp);
        const severityClass = threat.severity || 'medium';
        const icon = threat.icon || this.getThreatIcon(threat.type);
        const title = threat.title || this.getThreatTitle(threat.type);
        
        return `
            <div class="threat-feed-item ${severityClass}">
                <div class="threat-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="threat-content">
                    <div class="threat-header">
                        <span class="threat-title">${title}</span>
                        <span class="threat-severity-badge">${severityClass.toUpperCase()}</span>
                    </div>
                    <div class="threat-details">
                        <span class="threat-source">
                            <i class="fas fa-location-arrow"></i> ${threat.source}
                        </span>
                        <span class="threat-time">
                            <i class="fas fa-clock"></i> ${timeAgo}
                        </span>
                    </div>
                    <div class="threat-target">
                        <i class="fas fa-bullseye"></i> ${threat.target}
                    </div>
                </div>
            </div>
        `;
    }
    
    showThreatNotification(threat) {
        const notification = document.createElement('div');
        notification.className = `threat-notification ${threat.severity}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <i class="fas fa-${threat.icon || 'exclamation-triangle'}"></i>
                    <h4>NUEVA AMENAZA ${threat.severity.toUpperCase()}</h4>
                    <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="notification-body">
                    <p><strong>${threat.title}</strong></p>
                    <p>Fuente: ${threat.source}</p>
                    <p>Objetivo: ${threat.target}</p>
                    <small>${this.getTimeAgo(threat.timestamp)}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // RESTAURAR LOS MÉTODOS DE ANÁLISIS QUE FALTAN
    async analyzeIP(ipAddress) {
        if (!ipAddress || ipAddress.trim() === '') {
            this.showAlert('❌ Por favor ingresa una dirección IP válida', 'error');
            return;
        }
        
        this.addToLog(`🔍 Analizando IP: ${ipAddress}`);
        
        try {
            const response = await fetch(`${this.apiBase}/analyze-ip`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress })
            });
            
            if (!response.ok) throw new Error('Servidor no disponible');
            
            const data = await response.json();
            this.displayIPResults(data);
            
            if (data.threatScore > 70) {
                this.triggerAlert(`⚠️ ALTA AMENAZA DETECTADA en ${ipAddress}`, 'danger');
                this.metrics.maliciousIPs++;
                this.updateMetrics();
            }
            
        } catch (error) {
            console.log('Usando análisis simulado');
            const simulatedResult = this.simulateIPAnalysis(ipAddress);
            this.displayIPResults(simulatedResult);
        }
    }
    
    displayIPResults(data) {
        // Crear elemento si no existe
        if (!document.getElementById('ip-results')) {
            const toolCard = document.querySelector('.tool-card:first-child');
            if (toolCard) {
                const resultsDiv = document.createElement('div');
                resultsDiv.id = 'ip-results';
                resultsDiv.className = 'results-panel';
                toolCard.appendChild(resultsDiv);
            }
        }
        
        const resultsDiv = document.getElementById('ip-results');
        if (!resultsDiv) return;
        
        const threatLevel = data.threatScore > 70 ? 'high' : data.threatScore > 40 ? 'medium' : 'low';
        
        resultsDiv.innerHTML = `
            <div class="result-card ${threatLevel}">
                <h4><i class="fas fa-network-wired"></i> RESULTADOS: ${data.ip}</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">Nivel de Amenaza:</span>
                        <span class="value threat-${threatLevel}">${data.threatScore}/100</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Confianza:</span>
                        <span class="value">${data.confidence}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Reportes:</span>
                        <span class="value">${data.details.abuseReports}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">País:</span>
                        <span class="value">${data.details.country}</span>
                    </div>
                </div>
                <div class="recommendations">
                    ${data.recommendations.map(rec => `<p>${rec}</p>`).join('')}
                </div>
            </div>
        `;
    }
    
    simulateIPAnalysis(ipAddress) {
        const threatScore = Math.floor(Math.random() * 100);
        
        return {
            ip: ipAddress,
            threatScore: threatScore,
            confidence: threatScore > 70 ? 'ALTA' : threatScore > 40 ? 'MEDIA' : 'BAJA',
            details: {
                abuseReports: Math.floor(Math.random() * 100),
                maliciousVotes: Math.floor(Math.random() * 50),
                country: ['EE. UU.', 'China', 'Rusia', 'Alemania', 'Brasil'][Math.floor(Math.random() * 5)],
                isp: ['Comcast', 'AT&T', 'Verizon', 'China Telecom'][Math.floor(Math.random() * 4)]
            },
            recommendations: threatScore > 70 ? 
                ['🚨 BLOQUEAR ESTA IP', 'Reportar a administrador', 'Monitorear actividad'] :
                threatScore > 40 ?
                ['⚠️ Monitorear actividad', 'Agregar a lista de observación'] :
                ['✅ IP aparentemente segura']
        };
    }
    
    async analyzeURL(url) {
        if (!url || url.trim() === '' || !url.startsWith('http')) {
            this.showAlert('❌ Por favor ingresa una URL válida', 'error');
            return;
        }
        
        this.addToLog(`🌐 Analizando URL: ${url}`);
        
        try {
            const response = await fetch(`${this.apiBase}/analyze-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            
            if (!response.ok) throw new Error('Servidor no disponible');
            
            const data = await response.json();
            this.displayURLResults(data);
            
            if (data.phishingScore > 80) {
                this.triggerAlert(`🚨 POSIBLE PHISHING: ${url}`, 'danger');
                this.metrics.phishing++;
                this.updateMetrics();
            }
            
        } catch (error) {
            console.log('Usando análisis simulado');
            const simulatedResult = this.simulateURLAnalysis(url);
            this.displayURLResults(simulatedResult);
        }
    }
    
    displayURLResults(data) {
        const resultsDiv = document.getElementById('url-results');
        if (!resultsDiv) return;
        
        const isPhishing = data.phishingScore > 80;
        
        resultsDiv.innerHTML = `
            <div class="result-card ${isPhishing ? 'danger' : 'safe'}">
                <h4><i class="fas fa-shield-alt"></i> ANÁLISIS DE URL</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">URL:</span>
                        <span class="value">${data.url.substring(0, 30)}...</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Puntuación:</span>
                        <span class="value ${isPhishing ? 'danger' : 'safe'}">${data.phishingScore}/100</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Resultado:</span>
                        <span class="value ${isPhishing ? 'danger' : 'safe'}">
                            ${isPhishing ? '🚨 POSIBLE PHISHING' : '✅ URL SEGURA'}
                        </span>
                    </div>
                </div>
                <div class="recommendations">
                    ${data.recommendations.map(rec => `<p>${rec}</p>`).join('')}
                </div>
            </div>
        `;
    }
    
    simulateURLAnalysis(url) {
        const phishingScore = Math.floor(Math.random() * 100);
        const isPhishing = phishingScore > 80;
        
        return {
            url,
            phishingScore,
            isPhishing,
            recommendations: isPhishing ? [
                '🚨 NO ACCEDER A ESTE SITIO',
                'Reportar como phishing',
                'Verificar autenticidad',
                'Cambiar contraseñas si se ingresaron datos'
            ] : [
                '✅ URL parece segura',
                'Certificado SSL válido',
                'Dominio con antigüedad normal'
            ]
        };
    }
    
    async checkPassword(password) {
        if (!password || password.trim() === '') {
            this.showAlert('❌ Por favor ingresa una contraseña', 'error');
            return;
        }
        
        this.addToLog(`🔐 Verificando contraseña...`);
        
        // Simulación
        setTimeout(() => {
            const result = this.simulatePasswordCheck(password);
            this.displayPasswordResults(result);
            
            if (result.isCompromised) {
                this.triggerAlert(`🔓 CONTRASEÑA COMPROMETIDA`, 'danger');
            }
        }, 1000);
    }
    
    displayPasswordResults(data) {
        const resultsDiv = document.getElementById('password-results');
        if (!resultsDiv) return;
        
        const strengthColor = data.strength >= 80 ? 'safe' : data.strength >= 60 ? 'warning' : 'danger';
        
        resultsDiv.innerHTML = `
            <div class="result-card ${data.isCompromised ? 'danger' : strengthColor}">
                <h4><i class="fas fa-lock"></i> VERIFICACIÓN</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">Estado:</span>
                        <span class="value ${data.isCompromised ? 'danger' : 'safe'}">
                            ${data.isCompromised ? '🚨 COMPROMETIDA' : '✅ SEGURA'}
                        </span>
                    </div>
                    <div class="result-item">
                        <span class="label">Fortaleza:</span>
                        <span class="value ${strengthColor}">${data.strength}/100</span>
                    </div>
                    ${data.isCompromised ? `
                    <div class="result-item">
                        <span class="label">Veces encontrada:</span>
                        <span class="value danger">${data.timesFound}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="password-strength">
                    <div class="strength-bar">
                        <div class="strength-fill" style="width: ${data.strength}%"></div>
                    </div>
                </div>
                <div class="recommendations">
                    ${data.recommendations.map(rec => `<p>${rec}</p>`).join('')}
                </div>
            </div>
        `;
    }
    
    simulatePasswordCheck(password) {
        const strength = this.calculatePasswordStrength(password);
        const isCompromised = Math.random() > 0.7;
        
        return {
            isCompromised,
            timesFound: isCompromised ? Math.floor(Math.random() * 10000) : 0,
            strength: strength.score,
            strengthLevel: strength.level,
            recommendations: isCompromised ? [
                '🚨 ¡CAMBIA ESTA CONTRASEÑA!',
                'Usa una contraseña única',
                'Considera usar un gestor de contraseñas',
                'Habilita autenticación de dos factores'
            ] : [
                '✅ Contraseña segura',
                `Nivel: ${strength.level}`,
                strength.score < 70 ? 'Considera una contraseña más fuerte' : 'Excelente seguridad'
            ]
        };
    }
    
    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 15;
        
        if (/[A-Z]/.test(password)) score += 20;
        if (/[a-z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;
        
        const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'welcome'];
        if (!commonPasswords.includes(password.toLowerCase())) score += 10;
        
        score = Math.min(score, 100);
        
        let level = 'Débil';
        if (score >= 80) level = 'Muy Fuerte';
        else if (score >= 60) level = 'Fuerte';
        else if (score >= 40) level = 'Moderada';
        
        return { score, level };
    }
    
    updateMetrics() {
        // Simular cambios
        this.metrics.blocked += Math.floor(Math.random() * 10);
        this.metrics.active = Math.floor(Math.random() * 50) + 5;
        this.metrics.phishing += Math.floor(Math.random() * 5);
        this.metrics.malware += Math.floor(Math.random() * 3);
        this.metrics.maliciousIPs += Math.floor(Math.random() * 50);
        
        // Actualizar UI
        const blockedEl = document.getElementById('threats-blocked');
        const activeEl = document.getElementById('active-threats');
        const phishingEl = document.getElementById('phishing-count');
        const malwareEl = document.getElementById('malware-count');
        const badIPsEl = document.getElementById('bad-ips');
        
        if (blockedEl) blockedEl.textContent = this.metrics.blocked.toLocaleString();
        if (activeEl) activeEl.textContent = this.metrics.active.toLocaleString();
        if (phishingEl) phishingEl.textContent = this.metrics.phishing.toLocaleString();
        if (malwareEl) malwareEl.textContent = this.metrics.malware.toLocaleString();
        if (badIPsEl) badIPsEl.textContent = this.metrics.maliciousIPs.toLocaleString();
        
        this.updateTrendIndicators();
    }
    
    updateTrendIndicators() {
        const trends = document.querySelectorAll('.metric-trend');
        trends.forEach(trend => {
            trend.className = 'metric-trend ' + (Math.random() > 0.5 ? 'up' : 'down');
        });
    }
    
    addToLog(message) {
        const logContainer = document.getElementById('activity-log');
        if (!logContainer) {
            console.log('Log container no encontrado');
            return;
        }
        
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="log-time">[${timestamp}]</span>
            <span class="log-message">${message}</span>
        `;
        
        logContainer.prepend(logEntry);
        
        if (logContainer.children.length > 20) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
    
    triggerAlert(message, type = 'warning') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-notification ${type}`;
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${type === 'danger' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const commandGrid = document.querySelector('.command-grid');
        if (commandGrid) {
            commandGrid.appendChild(alertDiv);
        } else {
            document.body.appendChild(alertDiv);
        }
        
        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    showAlert(message, type = 'info') {
        alert(`[${type.toUpperCase()}] ${message}`);
    }
    
    // Métodos auxiliares
    getThreatIcon(type) {
        const icons = {
            phishing: 'fish',
            malware: 'virus',
            ddos: 'network-wired',
            intrusion: 'user-secret',
            default: 'exclamation-triangle'
        };
        return icons[type] || icons.default;
    }
    
    getThreatTitle(type) {
        const titles = {
            phishing: 'PHISHING DETECTADO',
            malware: 'NUEVO MALWARE',
            ddos: 'ATAQUE DDoS',
            intrusion: 'INTRUSIÓN',
            default: 'AMENAZA'
        };
        return titles[type] || titles.default;
    }
    
    getTimeAgo(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Ahora mismo';
        if (minutes < 60) return `${minutes} min`;
        
        const hours = Math.floor(diff / 3600000);
        if (hours < 24) return `${hours} h`;
        
        return date.toLocaleDateString();
    }
    
    initThreatMap() {
        const mapContainer = document.getElementById('threat-map');
        if (!mapContainer) return;
        
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-globe-americas"></i>
                <p>Mapa de amenazas en tiempo real</p>
                <div class="map-points">
                    <div class="point" style="top: 30%; left: 40%;" data-threat="phishing"></div>
                    <div class="point" style="top: 50%; left: 60%;" data-threat="malware"></div>
                    <div class="point" style="top: 40%; left: 20%;" data-threat="ddos"></div>
                    <div class="point" style="top: 60%; left: 80%;" data-threat="intrusion"></div>
                </div>
            </div>
        `;
    }
}

// Inicializar el sistema cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia del sistema
    window.threatHunter = new ThreatHunterSystem();
    
    // Exponer funciones globales
    window.analyzeIP = () => {
        const ip = document.getElementById('ip-input').value.trim();
        window.threatHunter.analyzeIP(ip || '192.168.1.1');
    };
    
    window.analyzeURL = () => {
        const url = document.getElementById('url-input').value.trim();
        window.threatHunter.analyzeURL(url || 'c');
    };
    
    window.checkPassword = () => {
        const password = document.getElementById('password-input').value;
        if (password && password !== 'Tu contraseña') {
            window.threatHunter.checkPassword(password);
        } else {
            alert('Por favor ingresa una contraseña para verificar');
        }
    };
    
    // Eventos para Enter
    document.getElementById('ip-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.analyzeIP();
    });
    
    document.getElementById('url-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.analyzeURL();
    });
    
    document.getElementById('password-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.checkPassword();
    });
    
    // Inicializar datos de ejemplo después de un breve retraso
    setTimeout(() => {
        if (window.threatHunter) {
            window.threatHunter.addToLog('Sistema de seguridad activado');
            window.threatHunter.addToLog('Monitoreando amenazas en tiempo real');
            window.threatHunter.addToLog('Feed de amenazas inicializado');
            
            // Inicializar mapa
            window.threatHunter.initThreatMap();
        }
    }, 2000);
});

// CSS necesario para el feed
const addFeedStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para el feed de amenazas */
        .threat-feed {
            margin-top: 20px;
        }
        
        .feed-container {
            height: 300px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 10px;
            margin-top: 10px;
        }
        
        .threat-feed-item {
            display: flex;
            align-items: flex-start;
            padding: 10px;
            margin-bottom: 8px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            border-left: 4px solid;
            transition: all 0.3s ease;
        }
        
        .threat-feed-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(2px);
        }
        
        .threat-feed-item.critical {
            border-left-color: #ff0000;
            background: rgba(255, 0, 0, 0.1);
        }
        
        .threat-feed-item.high {
            border-left-color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
        }
        
        .threat-feed-item.medium {
            border-left-color: #ffd93d;
            background: rgba(255, 217, 61, 0.1);
        }
        
        .threat-feed-item.low {
            border-left-color: #6bcf7f;
            background: rgba(107, 207, 127, 0.1);
        }
        
        .threat-icon {
            font-size: 1.2em;
            margin-right: 10px;
            margin-top: 2px;
        }
        
        .threat-feed-item.critical .threat-icon {
            color: #ff0000;
        }
        
        .threat-feed-item.high .threat-icon {
            color: #ff6b6b;
        }
        
        .threat-feed-item.medium .threat-icon {
            color: #ffd93d;
        }
        
        .threat-feed-item.low .threat-icon {
            color: #6bcf7f;
        }
        
        .threat-content {
            flex: 1;
        }
        
        .threat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }
        
        .threat-title {
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .threat-severity-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7em;
            font-weight: bold;
        }
        
        .threat-feed-item.critical .threat-severity-badge {
            background: #ff0000;
            color: white;
        }
        
        .threat-feed-item.high .threat-severity-badge {
            background: #ff6b6b;
            color: white;
        }
        
        .threat-feed-item.medium .threat-severity-badge {
            background: #ffd93d;
            color: black;
        }
        
        .threat-feed-item.low .threat-severity-badge {
            background: #6bcf7f;
            color: white;
        }
        
        .threat-details {
            display: flex;
            gap: 15px;
            font-size: 0.8em;
            opacity: 0.8;
            margin-bottom: 4px;
        }
        
        .threat-target {
            font-size: 0.8em;
            opacity: 0.7;
        }
        
        .empty-threats {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
        }
        
        .empty-threats i {
            font-size: 3em;
            margin-bottom: 10px;
            opacity: 0.3;
        }
        
        /* Notificaciones */
        .threat-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            z-index: 10000;
            animation: slideIn 0.5s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification-content {
            background: rgba(0, 0, 0, 0.95);
            border: 1px solid;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .threat-notification.critical .notification-content {
            border-color: #ff0000;
            background: rgba(255, 0, 0, 0.1);
        }
        
        .threat-notification.high .notification-content {
            border-color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
        }
        
        .notification-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .notification-header i {
            margin-right: 10px;
            font-size: 1.5em;
        }
        
        .notification-header h4 {
            flex: 1;
            margin: 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
        }
        
        /* Resultados */
        .results-panel {
            margin-top: 15px;
        }
        
        .result-card {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
            padding: 15px;
            border-left: 4px solid;
        }
        
        .result-card.high, .result-card.danger {
            border-left-color: #ff0000;
            background: rgba(255, 0, 0, 0.1);
        }
        
        .result-card.medium, .result-card.warning {
            border-left-color: #ffd93d;
            background: rgba(255, 217, 61, 0.1);
        }
        
        .result-card.low, .result-card.safe {
            border-left-color: #6bcf7f;
            background: rgba(107, 207, 127, 0.1);
        }
        
        .result-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 15px 0;
        }
        
        .result-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .password-strength {
            margin: 15px 0;
        }
        
        .strength-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }
        
        .strength-fill {
            height: 100%;
            background: var(--stranger-primary);
            transition: width 0.5s ease;
        }
        
        /* Mapa */
        .map-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: rgba(255, 255, 255, 0.5);
        }
        
        .map-placeholder i {
            font-size: 3em;
            margin-bottom: 10px;
            opacity: 0.3;
        }
        
        .map-points {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        
        .point {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .point[data-threat="phishing"] {
            background: #ffd93d;
            box-shadow: 0 0 10px #ffd93d;
        }
        
        .point[data-threat="malware"] {
            background: #ff0000;
            box-shadow: 0 0 10px #ff0000;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
};

// Añadir estilos cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFeedStyles);
} else {
    addFeedStyles();
}