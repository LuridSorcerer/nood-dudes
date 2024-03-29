// set up some global variables
let bgTileSheet = new Image();
let roboTileSheet = new Image();
let titleSheet = new Image();

let frames = 0;

// create a moveable virtual camera for screen scrolling
let camera = {
    view: {x:0, y:0, w:160, h:96}
}

// create a title screen object
let titleScreen = {
    location: {x:0, y:0, w:160, h:96},
    prev_location: {x:0, y:0},
    velocity: {x:0, y:1},
    sprite_sheet: titleSheet,
    sprite_clip: {x:0, y:0, w:160, h:96}
}

// create a sprite to move around
let sprite = {
    location: {x:0, y:0, w:8, h:8},
    prev_location: {x:0, y:0},
    velocity: {x:0.5, y:0.5},
    sprite_sheet: bgTileSheet,
    sprite_clip: {x:24, y:0, w:8, h:8}
}

// create a player object
let player = {
    location: {x:0, y:0, w:16, h:32},
    prev_location: {x:0, y:0},
    velocity: {x:0, y:0},
    sprite_sheet: roboTileSheet,
    sprite_clip: {x:0, y:0, w:32, h:32},
    sprite_offset: {x:-8, y:0},
    facing_left: false,
    on_ground: false
}

let ground = [];

let state = 0;

let test_song = new Audio('audio/bgm/test_song.ogg');
test_song.loop = true;
let jump_sound = new Audio('audio/se/jump.ogg');

// initialize game for the first time, or reset on game over
function init() {

    // initialize display
    lcd.init();

    // initialize controls
    controls.init();

    // load background tilesheet
    bgTileSheet.src = "img/bgTileSheet.png";

    // load robot tilesheet
    roboTileSheet.src = "img/robo.png";

    // load title screen graphic
    titleSheet.src = "img/title.png";

    // load ground tiles
    ground = [];
    for (let i = 0; i < 18; i++) {
        let tile = { 
            location: { x:i*8, y:camera.view.h-16, w:8, h:8},
            sprite_sheet: bgTileSheet,
            sprite_clip: { x:8, y:0, w:8, h:8 }
        };
        ground.push(tile);
    }
    ground.push( { location: {x:0, y:32, w:8, h:8}, sprite_sheet:bgTileSheet, sprite_clip: {x:8, y:0, w:8, h:8} } );
    ground.push( { location: {x:64, y:64, w:8, h:8}, sprite_sheet:bgTileSheet, sprite_clip: {x:8, y:0, w:8, h:8} } );

    // set player starting position
    player.location = {x:0, y:0, w:16, h:32};
    player.velocity = {x:0, y:0}

    // set title screen starting location
    titleScreen.location = {x:0, y:-80, w:160, h:96}

    // set game state to title screen
    state = 0;

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

    // title screen
    if (state === 0) {

        test_song.pause();
        lcd.set_bg_img(0);

        if (titleScreen.location.y < 0) {titleScreen.location.y += 0.5;}
        if (controls.D_Down != 0) {
            state = 1;
        }

    }

    // game running
    if (state === 1) {

        test_song.play();
        lcd.set_bg_img(1);

        // move the player
        physics.apply_gravity(player);
        physics.move(player);
        if(player.on_ground) {
            physics.apply_friction(player);
        }

        // move the sprite
        physics.move(sprite);

        // check and handle collisions
        player.on_ground = false;
        for (let i=0; i<ground.length; i++) {
            if ( physics.check_collision(player,ground[i]) ) {
                physics.eject(player,ground[i]);
            }
        }

        // debug: basic platform controls
        let acceleration = 0.1;
        if (controls.Btn_2 === 1 && player.on_ground) {
            player.velocity.y = -5;
            jump_sound.currentTime = 0;
            jump_sound.play();
        }
        if (controls.D_Left != 0) {
            player.velocity.x -= acceleration;
            player.facing_left = true;
            if ( Math.floor(player.location.x / 4) % 2 == 0 )
                player.sprite_clip = {x:0, y:32, w:32, h:32};
            else 
                player.sprite_clip = {x:32, y:32, w:32, h:32};
        } else 
        if (controls.D_Right != 0) {
            player.velocity.x += acceleration;
            player.facing_left = false;
            if ( Math.floor(player.location.x / 4) % 2 == 0 )
                player.sprite_clip = {x:0, y:0, w:32, h:32};
            else 
                player.sprite_clip = {x:32, y:0, w:32, h:32};
        } else {
            if (player.facing_left)
                player.sprite_clip = {x:0, y:32, w:32, h:32};
            else 
               player.sprite_clip = {x:0, y:0, w:32, h:32};   
        }

        // bounce the sprite off of the floor and canvas edges 
        if (sprite.location.y <=0 || sprite.location.y >= 72) { sprite.velocity.y *= -1; }
        if (sprite.location.x <=0 || sprite.location.x >= 152) { sprite.velocity.x *= -1; }

        // if player falls off, reset
        if (player.location.y > 200) {
            init();
        }

    }

    // update frame count
    frames++;

}

// render() : draw the game to the screen
function render() {

    // clear canvas
    lcd.clear();

    // fit canvas to window
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerWidth;

    // title screen
    if (state === 0) {
        lcd.draw_sprite(titleScreen, camera);
    }

    // game running
    if (state === 1) {
        // draw the ground tiles
        for (let i = 0; i < ground.length; i++) {
            lcd.draw_sprite(ground[i], camera )
        }

        // draw the test sprite
        lcd.draw_sprite(sprite, camera);

        // draw the robot
        // if (player.on_ground) lcd.draw_hitbox(player);
        lcd.draw_sprite(player, camera);
    }

    // wait until the next frame
    requestAnimationFrame(loop);
}

init();
loop();
