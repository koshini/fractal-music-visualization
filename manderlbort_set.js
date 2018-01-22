var song, analyzer;
var max_iteration = 100;

function preload() {
    song = loadSound('media/music.mp3');
}

function setup() {
    createCanvas(360, 360);
    pixelDensity(1);

    song.loop();

    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);

}

function draw(){

    loadPixels();

    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            var a = map(x, 0, width, -1.5, 1.5);
            var b = map(y, 0, height, -2.5, 2.5);

            var ca = a;
            var cb = b;

            var n = 0;

            while(n < max_iteration){
                var aa = a * a - b * b;
                var bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if (abs(a + b) > 16){
                    break;
                }

                n++;
            }

            var brightness = 200;
            // var brightness = map(n, 0, max_iteration, 0, 1);
            // brightness = map(sqrt(brightness), 0, 1, 0, 255);


            if(n === max_iteration){
                brightness = 0;
            }
        }
    }
    updatePixel();
}