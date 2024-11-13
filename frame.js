const spider = document.getElementById('spider');
const boss = document.getElementById('boss');
const enemies = document.getElementById('enemies');
const score = document.getElementById('score');


function jump() {
    spider.classList('jump-animation');
    setTimeout(() => {
        spider.classList.remove('jump-animation');
    }, 500);
}
function run() {
    spider.classList('run.animation');
}

document.addEventListener('keypress', () => {
    if(!spider.classList.contains('jump-animation')) {
jump();
    }
})

function