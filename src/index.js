/*
 * index.js
 * Copyright (C) 2017 Bradley McCrorey <brad@projectpixelpress.com>
 *
 * No license.
 */

let async = function(funcs, scope) {
    (function next() {
          if(funcs.length > 0) {
              var f = funcs.shift();
              f.apply(scope, [next].concat(Array.prototype.slice.call(arguments, 0)));
          }
    })();
};
let obj = {
    value: null
};

let ifBrowser = function() {typeof docuemnt !== 'object'}

let paletteread = function() {
    const getPixel = function(imgData, index) {
        let i = index*4, d = imgData.data;
        return {
            r: d[i],
            g: d[i+1],
            b: d[i+2],
            a: d[i+3]
        }
    }

    const width = 16;
    const height = 16;
    const palette = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAACYklEQVQ4jXXRMYudVRDG8f9dX7hbXBFkkYCCCZYWWauAKaK1RYpYWNilMaQTSwtLP0CsVlEhIqKdCkGUFIIoibKyG/eCR+4se0xmYRYGnLhz8YRj8V6TKPgFnvk9zwD0vtjp356/0F/6/Ea//sY3/dPrZ3q78nLfOvdkPzO93PvTW70fL3rfeb8f7N3od457X/zRez9e9LXeO1Shvn2CD/wkP5U9JpduYZ64J0mgzYjfd6F+T1hF1RCHMt9lzcxAhc0TV/BXk9e3LnNhbwe3xL2RQ6LNyGOHepN0Rc2RACm7rLk7SEUMhAoFQEZBJI1Am2Pp/HntDuGK2UogZSUQQXQVIA8HQJJYczSd2xu3STfMHHGQUhnGgIpUGJB/C5bQhkDbAOakQYZhzRAgpDK4O2il7MI6cl/gljhw7+5v6PQZ0hw32AjDw5EBotqqwo/73NyGj3gH3gP4EPMkADv3LEaMwzlkOO7OvsEXX+s4YgX2v4QRIIjA2YMDthdLTjPjrWtvohZsvrZFy+DqK5sQxvb2asTKyKZCpVIrXAWiQESgUjAPdC5YgJUCaczn5YFgdf5+wCdA1CmRyb3Fz0Q0tCieDSsCYZRSxi/ofwRUYD4nBLIFvx79RXrDzFjfAJMKzRAr4xceriD/fGI+JxQyE1Ulo6FqzGYNqwozo9aVoE6nsHxQgQqUQujAMgNTSB8wb7RILBSeMlRlDJDl/1QwIBNzyFhH7zaIhlnAhnF4eIvh8IXzTJ4vPHJRea6e5fT+Zzzx8Q989cujPP7duzCZTGzWembjiCPW4zEsGoQxOfUifwNCmgduu+oD9AAAAABJRU5ErkJggg==";

    let ctx, img, canvas, Canvas;

    if(!ifBrowser()) { // nodejs code
        Canvas = require('canvas');
        let Image = Canvas.Image;
        canvas = new Canvas(width, height);

        img = new Image;
    } else { // browser code
        canvas = document.createElement('canvas');
        canvas.width  = 16;
        canvas.height = 16;

        img = new Image();
    }
    const paletteKey = [];
    async([
        function(callback) {
            img.onload = function() {
                ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0, img.width , img.height );

                let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);

                let rows = [];
                for(let i=0;i<height;i++) {
                    rows.push(i);
                }
                for(let j=0;j<rows.length;j++) {
                    let start = rows[j]*width;
                    for(let k=start;k<(start + width);k++) {
                        paletteKey.push(getPixel(imgData,k));
                    }
                }
                callback();
            }
            img.src = palette;
        },
        function(callback) {
            callback();
        },
        function() {
            if(!ifBrowser()) img.onload();
        }
    ], obj);
    return paletteKey;
}

if(typeof document !== "object") { // nodejs code
    module.exports = paletteread;
}
