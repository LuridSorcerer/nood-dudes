let physics = {

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
        // stub
    }, 

    check_collision(character,sprite) {
        // stub
    },

    push_out(character,sprite){
        // stub
    },

}