// Canvas solo para la página de ranking
const canvas = document.getElementById("fondo");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particula {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 24 + 12;
            const simbolos = ["+", "-", "×", "÷", "√", "π", "∑", "∫", "∂", "≈"];
            this.text = simbolos[Math.floor(Math.random() * simbolos.length)];
            this.alpha = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.font = `bold ${this.size}px Orbitron`;
            ctx.fillStyle = `hsl(${Math.random() * 60 + 150}, 100%, 60%)`;
            ctx.fillText(this.text, this.x, this.y);
            ctx.restore();
        }
    }

    let particulas = [];
    for (let i = 0; i < 60; i++) {
        particulas.push(new Particula());
    }

    function animar() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particulas.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animar);
    }

    animar();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}