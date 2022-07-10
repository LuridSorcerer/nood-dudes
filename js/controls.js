let controls = {

    // array of booleans to keep track of which keys are down
    _pressed: [],

    // variable for each button, tracks how many frames they have been
    // held down for
    D_Up: 0,
    D_Down: 0,
    D_Left: 0,
    D_Right: 0,

    // boolean to turn on or off the controls
    Enabled: false,

    // init: Set up controls and get ready to read inputs.
    init() {
        this.Enabled = true;
        window.onkeyup = function(e) { controls._pressed[e.keyCode] = false; }
        window.onkeydown = function(e) { controls._pressed[e.keyCode] = true; }    
    },

    // read: check if each button is pressed. Increment length it's been
    // held or reset it to zero.
    read() {

        if (this.Enabled) {

            // check for up key (W)
            if (this._pressed[87]) {
                this.D_Up++;
            } else {
                this.D_Up = 0;
            }

            // check for down key (S)
            if (this._pressed[83]) {
                this.D_Down++;
            } else {
                this.D_Down = 0;
            }

            // check for right key (A)
            if (this._pressed[68]) {
                this.D_Right++;
            } else {
                this.D_Right = 0;
            }

            // check for left key (D)
            if (this._pressed[65]) {
                this.D_Left++;
            } else {
                this.D_Left = 0;
            }

        } else {
            this.D_Up = 0;
            this.D_Down = 0;
            this.D_Left = 0;
            this.D_Right = 0;
        }
    }

}