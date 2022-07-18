function move(sprite) {
    // save the previous position
    sprite.prev_location.x = sprite.location.x;
    sprite.prev_location.y = sprite.location.y;

    // update the current position
    sprite.location.x += sprite.velocity.x;
    sprite.location.y += sprite.velocity.y;
}