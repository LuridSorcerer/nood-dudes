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
        // stub
    },

    push_out(character,sprite){
        // stub
    },

}