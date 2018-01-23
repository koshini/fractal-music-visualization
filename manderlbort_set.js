var scalar = 5;
var xTranslate = 5;
var yTranslate;
var maxIterations = 50;
var song, analyzer;

function preload() {
    song = loadSound('media/music.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    yTranslate = height / 2 - width / 2;

    song.loop();

    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);

}

function draw() {
    loadPixels();
    var amp = analyzer.getLevel();
    var coefficient = map(amp, 0, 1, 1, 6);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var val = coefficient;

            var a = map(x, 0 , width, -val, val);
            var b = map(y, 0 + yTranslate, width + yTranslate, -val, val);


            // var a = map(x, 0 + xTranslate, width + xTranslate, -scalar + coefficient, scalar + coefficient);
            // var b = map(y, 0 + yTranslate, width + yTranslate, -scalar + coefficient, scalar + coefficient);

            var ca = a;
            var cb = b;
            var n = 0;
            while (n < maxIterations) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;
                if (a + b > 16) {
                    break;
                }
                n++;
            }
            var brightness = map(n, 0, maxIterations, 0, 1);
            brightness = map(sqrt(brightness), 0, 1, 0, 255);
            if (n === maxIterations) {
                brightness = 0;
            }

            var pix = (x + y * width) * 4;
            pixels[pix] = brightness;
            pixels[pix + 1] = brightness;
            pixels[pix + 2] = brightness;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    scalar *= 0.9;
    xTranslate = (1 / scalar) * (width * 0.705) ;
}