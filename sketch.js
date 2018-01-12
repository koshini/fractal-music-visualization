var theta1, song, fft, spectrum, waveform;

function preload() {
    song = loadSound('media/music.mp3');
}

function setup() {
    createCanvas(640, 640);
    song.play();

    // Create a new FFT to analyze
    fft = new p5.FFT();
    fft.setInput(song);
    spectrum = fft.analyze();
    waveform = fft.waveform();
}

function draw() {
    background(255);


    // The first branch starts at the bottom of the window.
    translate(width/2, height);
    stroke(0);
    for (var i = 0; i < waveform.length; i++) {
        theta1 = map(spectrum[i], 0, 255, 0, PI / 2);
        theta2 = map(waveform[i], -1, 1, 0, PI / 2);
    }
    branch(160)

}
//
// function getAmp(analyzer){
//   level = analyzer.getLevel()*400;
//   return level
// }

function branch(a) {
    line(0, 0, 0, -a);
    translate(0, -a);

    // each branch will be 2/3 long as the previous one
    a *= 0.66;

    //exit recursion at length smaller or equal to 2
    if (a > 2) {
        push();
        rotate(theta1);
        // Subsequent calls to branch()
        // setTimeout(branch(a),500);
        branch(a);
        pop();

        //repeat but rotate to the opposite direction
        push();
        rotate(-theta2);
        // setTimeout(branch(a),500);
        branch(a);
        pop();
    }
}
