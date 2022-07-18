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
        ctx.drawImage(
            // source sprite sheet
            character.sprite_sheet, 
            
            // source clip
            character.sprite_clip.x, 
            character.sprite_clip.y,
            character.sprite_clip.w,
            character.sprite_clip.h,

            //destination clip
            Math.floor(character.location.x-camera.view.x), 
            Math.floor(character.location.y-camera.view.y),
            character.sprite_clip.w,
            character.sprite_clip.h);
    }
}