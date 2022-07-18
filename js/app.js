// set up some global variables
let canvas;
let ctx;

let bgTileSheet = new Image();
let roboTileSheet = new Image();

let camera = {
    location: {x:0, y:0}
}

// create a sprite to move around
let sprite = {
    location: {x:0, y:0},
    prev_location: {x:0, y:0},
    velocity: {x:1, y:1},
    sprite_sheet: bgTileSheet,
    sprite_clip: {x:24, y:0, w:8, h:8}
}

// create a player object
let player = {
    location: {x:0, y:0},
    prev_location: {x:0, y:0},
    velocity: {x:1, y:1},
    sprite_sheet: roboTileSheet,
    sprite_clip: {x:0, y:0, w:32, h:32}
}

function init() {

    // initialize display
    lcd.init();

    // initialize controls
    controls.init();

    // load background tilesheet
    bgTileSheet.src = "img/bgTileSheet.png";

    // load robot tilesheet
    roboTileSheet.src = "img/robo.png";

}

function render() {

    // TODO: update() - read controls
    controls.read();

    // clear canvas
    lcd.clear();

    // fit canvas to window
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerWidth;

    // TODO: replace with array of background objects - draw to the canvas
    for (let i=0; i<20; i++) {
        ctx.drawImage(bgTileSheet, 8,0, 8,8, i*8,80, 8,8);
        ctx.drawImage(bgTileSheet, 16,0, 8,8, i*8,88, 8,8);
    }

    // draw the test sprite
    lcd.draw_sprite(sprite, camera);

    // draw the robot
    lcd.draw_sprite(player, camera);
    
    // TODO: update() - move the sprite
    move(sprite);

    // TODO: update() - bounce the sprite off of the floor and canvas edges 
    if (sprite.location.y <=0 || sprite.location.y >= 72) { sprite.velocity.y *= -1; }
    if (sprite.location.x <=0 || sprite.location.x >= 152) { sprite.velocity.x *= -1; }

    // wait until the next frame
    requestAnimationFrame(render);
}

init();
render();
