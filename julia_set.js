var scalar = 5;
var w = 640;
var h = 500;
var maxIterations = 50;
var x0 = -w/2;
var y0 = -h/2;
var x, y;


function setup() {
    createCanvas(w, h);
    pixelDensity(1);
}

function draw() {
    loadPixels();
    var ca = 0;
    var cb = -0.8;

    var xMax = x0 + w;
    var yMax = y0 + h;

    var dx = (xMax - x0) / width;
    var dy = (yMax - y0) / height;

    x = x0;
    for (var i = 0; i < width; i++) {
        y = y0;
        for (var j = 0; j < height; j++) {
            var n = 0;
            var a = x;
            var b = y;
            while (n < maxIterations) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;
                if (aa*aa + bb*bb > 4) {
                    break;
                }
                n++;
            }
            var brightness;

            // var brightness = map(n, 0, maxIterations, 0, 1);
            // brightness = map(sqrt(brightness), 0, 1, 0, 255);
            if (n === maxIterations) {
                brightness = 0;
            }

            var pix = (i + j * width) * 4;
            pixels[pix] = brightness;
            pixels[pix + 1] = brightness;
            pixels[pix + 2] = brightness;
            pixels[pix + 3] = 255;

        }
        x += dx;
    }
    y += dy;
    updatePixels();

}
