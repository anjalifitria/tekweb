let ekspresi = "";
let isEvaluated = false;

const calcCard = document.getElementById('calcCard');
const winterBg = document.getElementById('winterBg');
const rabbitPet = document.getElementById('rabbitPet');
const catPet = document.getElementById('catPet');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (winterBg) winterBg.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px) scale(1.05)`;
    if (rabbitPet) rabbitPet.style.transform = `translate(${x * 0.3}px, ${y * 0.2}px)`;
    if (catPet) catPet.style.transform = `translate(${x * 0.3}px, ${y * 0.2}px)`;
    if (calcCard) calcCard.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
});

const canvas = document.getElementById('snowCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const flakes = Array.from({ length: 65 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 3 + 1,
        d: Math.random() + 0.5
    }));

    function drawSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        flakes.forEach(f => {
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        });
        ctx.fill();

        flakes.forEach(f => {
            f.y += f.d * 1.2;
            f.x += Math.sin(f.y / 30) * 0.5;
            if (f.y > canvas.height) {
                f.y = -10;
                f.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(drawSnow);
    }
    drawSnow();
}

function updateDisplay() {
    document.getElementById("display").value = ekspresi;
    hitungPreview();
}

function appendInput(val) {
    if (isEvaluated) {
        if (!['+', '-', '×', '÷', '^', '%', 'mod'].includes(val)) {
            ekspresi = "";
        }
        isEvaluated = false;
    }

    ekspresi += val;
    updateDisplay();
}

function clearDisplay() {
    ekspresi = "";
    isEvaluated = false;
    document.getElementById("display").value = "";
    document.getElementById("previewHasil").textContent = "";
    document.getElementById("hasil").textContent = "0";
}

function deleteChar() {
    if (isEvaluated) {
        clearDisplay();
        return;
    }
    ekspresi = ekspresi.slice(0, -1);
    updateDisplay();
}

function hitungPreview() {
    if (!ekspresi || ekspresi.trim() === "") {
        document.getElementById("previewHasil").textContent = "";
        return;
    }

    try {
        let parsedExpression = ubahSimbolKeMath(ekspresi);
        let hasilEvaluasi = Function('"use strict";return (' + parsedExpression + ')')();

        if (hasilEvaluasi !== undefined && !isNaN(hasilEvaluasi) && isFinite(hasilEvaluasi)) {
            let hasilFormatted = Math.round(hasilEvaluasi * 1000000) / 1000000;
            document.getElementById("previewHasil").textContent = "= " + hasilFormatted;
        } else {
            document.getElementById("previewHasil").textContent = "";
        }
    } catch (e) {
        document.getElementById("previewHasil").textContent = "";
    }
}

function hitungFinal() {
    if (!ekspresi) return;

    try {
        let parsedExpression = ubahSimbolKeMath(ekspresi);
        let hasilEvaluasi = Function('"use strict";return (' + parsedExpression + ')')();

        if (hasilEvaluasi !== undefined && !isNaN(hasilEvaluasi) && isFinite(hasilEvaluasi)) {
            let hasilFormatted = Math.round(hasilEvaluasi * 1000000) / 1000000;
            document.getElementById("hasil").textContent = hasilFormatted;
            ekspresi = hasilFormatted.toString();
            document.getElementById("previewHasil").textContent = "";
            isEvaluated = true;
        } else {
            document.getElementById("hasil").textContent = "Error";
        }
    } catch (e) {
        document.getElementById("hasil").textContent = "Format Error";
    }
}

function ubahSimbolKeMath(exp) {
    return exp
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^2/g, '**2')
        .replace(/\^/g, '**')
        .replace(/mod/g, '%')
        .replace(/1\//g, '1/');
}