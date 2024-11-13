const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HIEGHT = canvas.height = 600;

const playerIamge = new Image();
playerIamge.src = 'img\kitty.jpg';

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HIEGHT);
    //CTX.FILLrECT(100,50,100,100);
    ctx.drawIamge(Image, sx, sy, sw, sh, dx, dy, dw. dh);
    ctx.drawIamge(playerImage, 0, 0, 2500,5500);
    requestAnimationFrame(animate);
};
animate();

