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

let ground = [];

function init() {

    // initialize display
    lcd.init();

    // initialize controls
    controls.init();

    // load background tilesheet
    bgTileSheet.src = "img/bgTileSheet.png";

    // load robot tilesheet
    roboTileSheet.src = "img/robo.png";

    // load ground tiles
    for (let i = 0; i < 10; i++) {
        let tile = {x:i*8,y:camera.view.h-16,w:8,h:8}
        ground.push(tile);
    }

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

    if (player.location.y > camera.view.h - player.sprite_clip.h - 16) {
        player.location.y = camera.view.h - player.sprite_clip.h - 16;
        player.velocity.y = -7;
    }

    // move the player
    physics.apply_gravity(player);
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

    // draw the ground tiles
    for (let i = 0; i < ground.length; i++) {
        lcd.draw_sprite( 
            {
                sprite_sheet:bgTileSheet, 
                sprite_clip:{x:8,y:0,w:8,h:8}, 
                location:{x:ground[i].x, y:ground[i].y} 
            }, camera )
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
