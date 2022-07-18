let physics = {

    // physics constants
    terminal_velocity: 4,
    gravity_strength: 0.5,

    // move() : Apply current velocity to a character's position
    move(character) {
        // save the previous position
        character.prev_location.x = character.location.x;
        character.prev_location.y = character.location.y;

        // update the current position
        character.location.x += character.velocity.x;
        character.location.y += character.velocity.y;
    },

    apply_gravity(character) {
        // apply downward velocity
        if (character.velocity.y < this.terminal_velocity) {
            character.velocity.y += this.gravity_strength;
        }

        // restrict falling speed to terminal velocity
        if (character.velocity.y >= this.terminal_velocity) {
            character.velocity.y = this.terminal_velocity;
        }
    }, 

    check_collision(character,sprite) {

        // return true if bounding boxes overlap
        if (
            character.location.x < sprite.location.x + sprite.location.w &&
            character.location.x + character.location.w > sprite.location.x &&
            character.location.y < sprite.location.y + sprite.location.h &&
            character.location.y + character.location.h > sprite.location.y
        )
        { return true; }

        // return false if they did not
        return false;

    },

    eject(character,sprite){
        // check for collision from above
        if (character.prev_location.y + character.location.h <= sprite.location.y) {
            character.location.y = sprite.location.y - character.location.h;
            character.velocity.y = 0;
            //console.log("top")
        } else 
        // check for collision from left
        if (character.prev_location.x + character.location.w <= sprite.location.x) {
            character.location.x = sprite.location.x - character.location.w;
            character.velocity.x = 0;
        } else 
        // check for collision from right
        if (character.prev_location.x >= sprite.location.x + sprite.location.w) {
            character.location.x = sprite.location.x + sprite.location.w;
            character.velocity.x = 0;
        } else 
        // check for collision from bottom
        if (character.prev_location.y >= sprite.location.y + sprite.location.h ) {
            character.location.y = sprite.location.y + sprite.location.h;
            character.velocity.y = 0;
        }
    },

}