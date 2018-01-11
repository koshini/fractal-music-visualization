var theta, song, analyzer;

function preload() {
  song = loadSound('media/music.mp3');
}

function setup() {
  createCanvas(640, 640);
  song.loop()

  // Create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}

function draw() {
  background(255);

  level = analyzer.getLevel()*400;
  // amplitude = (level, 0,1,0,200)
  theta = radians(level)
  //theta = map(mouseX,0,width,0,PI/2);

  // The first branch starts at the bottom of the window.
  translate(width/2, height);
  stroke(0);
  branch(160);
}

function branch(a) {
  line(0, 0, 0, -a);
  translate(0, -a);
  // each branch will be 2/3 long as the previous one
  a *= 0.66;

  //exit recursion at length smaller or equal to 2
  if (a > 2) {
    push();
    rotate(theta);
    // Subsequent calls to branch()
    // TO-DO
    // how do I "pause" ?
    setTimeout(branch(a),0);
    pop();

    //repeat but rotate to the opposite direction
    push();
    rotate(-theta);
    setTimeout(branch(a),50);
    pop();
  }
}
