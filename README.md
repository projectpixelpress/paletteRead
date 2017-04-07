## paletteread

This will generate an object from a predefined image stored as base64 (should be easy to add an option to feed an image in).

This is very specific, and generates a map from left -> right, bottom -> top.

## installation

```npm i paletteread --save```

or

```bower i paletteread --save```

## req's

requires https://github.com/Automattic/node-canvas which has some pretty serious req's. FYI.

## usage

### nodejs
```
var p = require('paletteread');

var palette = new p();
```

### browser
```
<script src="paletteread/src/index.js"></script>
...
<script>
let foo = new paletteread();
</script>
```

