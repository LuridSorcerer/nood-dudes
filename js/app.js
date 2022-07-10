// get real canvas
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");

// create virtual lcd screen
let lcd = document.createElement('canvas');
lcd.width = 160;
lcd.height = 96;
lcdCtx = lcd.getContext("2d");

// set up real canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// load tilesheet
let bgTileSheet = new Image();
bgTileSheet.src = "img/bgTileSheet.png";

function render() {
    for (let i=0; i<20; i++) {
        for (let j=0; j<12; j++) {
            lcdCtx.drawImage(bgTileSheet, 0,0, 8,8, i*8,j*8, 8,8);
        }
    }
    //lcdCtx.drawImage(bgTileSheet,0,0);
    ctx.drawImage(lcd, 0,0, lcd.width,lcd.height, 0,0, canvas.width,canvas.height );
    requestAnimationFrame(render);
}

render();
