let lcd = {
    canvas: null,
    ctx: null,

    init() {
        // get real canvas
        canvas = document.getElementsByTagName("canvas")[0];
        ctx = canvas.getContext("2d");

        // set up canvas
        canvas.width = 160;
        canvas.height = 96;

        // set background color
        document.getElementsByTagName("body")[0].style.backgroundColor = "808080";
        
    },

    clear() {
        // clear the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
    },

    draw_sprite(character, camera) {
        // check if there's a sprite offset
        if (!character.sprite_offset) { character.sprite_offset = {x:0, y:0} }
        
        // draw the sprite to the screen
        ctx.drawImage(
            // source sprite sheet
            character.sprite_sheet, 
            
            // source clip
            character.sprite_clip.x, 
            character.sprite_clip.y,
            character.sprite_clip.w,
            character.sprite_clip.h,

            //destination clip
            Math.floor(character.location.x-camera.view.x+character.sprite_offset.x), 
            Math.floor(character.location.y-camera.view.y+character.sprite_offset.y),
            character.sprite_clip.w,
            character.sprite_clip.h);
    },

    draw_hitbox(character) {
        ctx.fillStyle = "red";
        ctx.fillRect(
            character.location.x,
            character.location.y,
            character.location.w,
            character.location.h
        );
    }
}