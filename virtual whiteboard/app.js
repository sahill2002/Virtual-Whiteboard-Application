document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');

    
    let painting = false;
    let erasing = false;
    let color = document.getElementById('color').value;
    let lineWidth = document.getElementById('size').value;

    console.log('app.js is loaded'); 

    function startPosition(e) {
        painting = true;
        draw(e); 
    }

    function endPosition() {
        painting = false;
        ctx.beginPath(); 
    }

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect(); 
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function draw(e) {
        if (!painting) return;

        const mousePos = getMousePos(canvas, e);

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round'; 

        if (erasing) {
            ctx.strokeStyle = '#FFFFFF'; 
            ctx.lineWidth = 20; 
        } else {
            ctx.strokeStyle = color;
        }

        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.getElementById('color').addEventListener('input', (e) => {
        color = e.target.value;
    });

    document.getElementById('size').addEventListener('input', (e) => {
        lineWidth = e.target.value;
    });

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveCanvas() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'whiteboard.png';
        link.click();
    }

    function saveNotes() {
        const notes = document.getElementById('notes').value;
        const blob = new Blob([notes], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'notes.txt';
        link.click();
    }

    function clearNotes() {
        document.getElementById('notes').value = '';
    }

    function toggleEraser() {
        erasing = !erasing;
        document.querySelector('.toolbar button:nth-child(3)').textContent = erasing ? 'Eraser On' : 'Toggle Eraser';
    }

    
    window.clearCanvas = clearCanvas;
    window.saveCanvas = saveCanvas;
    window.saveNotes = saveNotes;
    window.clearNotes = clearNotes;
    window.toggleEraser = toggleEraser;
});
