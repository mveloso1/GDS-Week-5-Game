class mainScene {

    preload() {
        // Preload assets like sprites and sounds
    }

    create() {
        // Initialize scene with position of game elements
    }

    update() {
        // update is called 60 times per second and handles game logic
    }
  
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#097297', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});