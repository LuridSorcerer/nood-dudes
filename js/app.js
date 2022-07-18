// set up some global variables
let bgTileSheet = new Image();
let roboTileSheet = new Image();

// create a moveable virtual camera for screen scrolling
let camera = {
    view: {x:0, y:0, w:160, h:96}
}

// create a sprite to move around
let sprite = {
    location: {x:0, y:0},
    prev_location: {x:0, y:0},
    velocity: {x:0.5, y:0.5},
    sprite_sheet: bgTileSheet,
    sprite_clip: {x:24, y:0, w:8, h:8}
}

// create a player object
let player = {
    location: {x:0, y:0},
    prev_location: {x:0, y:0},
    velocity: {x:0, y:0},
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

// loop() : game loop, update game state then render to screen
function loop() {
    update();
    render();
}

// update() : update game state (read controls and react, etc.)
function update() {

    // read controls
    controls.read();

    // check if character needs to be moved up/down
    if (controls.D_Down > 0 && controls.D_Up === 0) { 
        player.velocity.y = 1; 
    } else if (controls.D_Up > 0 && controls.D_Down === 0 ) {
        player.velocity.y = -1;
    } else { player.velocity.y = 0; }

    // check if character needs to be moved left/right
    if (controls.D_Right > 0 && controls.D_Left === 0) { 
        player.velocity.x = 1; 
    } else if (controls.D_Left > 0 && controls.D_Right === 0 ) {
        player.velocity.x = -1;
    } else { player.velocity.x = 0; }

    // move the player
    physics.move(player);

    // move the sprite
    physics.move(sprite);

    // bounce the sprite off of the floor and canvas edges 
    if (sprite.location.y <=0 || sprite.location.y >= 72) { sprite.velocity.y *= -1; }
    if (sprite.location.x <=0 || sprite.location.x >= 152) { sprite.velocity.x *= -1; }

}

// render() : draw the game to the screen
function render() {

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

    // wait until the next frame
    requestAnimationFrame(loop);
}

init();
loop();
