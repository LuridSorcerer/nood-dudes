// set up some global variables
let canvas;
let ctx;

let bgTileSheet = new Image();
let roboTileSheet = new Image();

// create a sprite to move around
let sprite = {
    location: {x:0, y:0},
    prev_location: {x:0, y:0},
    velocity: {x:1, y:1}
}

function init() {

    // get real canvas
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");

    // set up canvas
    canvas.width = 160;
    canvas.height = 96;

    document.getElementsByTagName("body")[0].style.backgroundColor = "808080";

    // initialize controls
    controls.init();

    // load background tilesheet
    bgTileSheet.src = "img/bgTileSheet.png";

    // load robot tilesheet
    roboTileSheet.src = "img/robo.png";

}

function render() {

    // read controls
    controls.read();

    // fit canvas to window
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerWidth;

    // clear the canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // draw to the canvas
    for (let i=0; i<20; i++) {
        ctx.drawImage(bgTileSheet, 8,0, 8,8, i*8,80, 8,8);
        ctx.drawImage(bgTileSheet, 16,0, 8,8, i*8,88, 8,8);
    }

    // draw the test sprite
    ctx.drawImage(bgTileSheet, 24,0, 8,8, sprite.location.x,sprite.location.y, 8,8);

    // draw the robot
    ctx.drawImage(roboTileSheet, 0,0, 32,32, 0,48, 32,32)

    // move the sprite
    move(sprite);

    // bounce the sprite off of the floor and canvas edges 
    if (sprite.location.y <=0 || sprite.location.y >= 72) { sprite.velocity.y *= -1; }
    if (sprite.location.x <=0 || sprite.location.x >= 152) { sprite.velocity.x *= -1; }

    // wait until the next frame
    requestAnimationFrame(render);
}

init();
render();
