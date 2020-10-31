# User Manual

## What is ImageAnnotatorJS
ImageAnnotatorJS is a JavaScript library that helps the frontend engineer to develop an annotating system. 
One can use it for annotating the shapes onto the HTML5 canvas.

## Environment setup
### JavaScript Version
- ECMAScript 6
### Library Dependency
- JQuery 3.5.1
- RequireJS 2.3.6
- FabricJS 3.6.6

## About 'AMD' 
AMD is the abbreviation for Asynchronous module definition. 
Package complies with this standard will load the dependent model asynchronously.  
For more information, please refer to the wiki: 
https://en.wikipedia.org/wiki/Asynchronous_module_definition

---
## How to...
### Access the library
- Include the below JavaScript in the HTML file
```html
<script src="js/image_annotator/lib/require.js"></script>
<script src="js/image_annotator/config.js"></script>
``` 
### Write your own Hello ImageAnnotatorJS
- In main.html
```html
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <script src="js/image_annotator/lib/require.js"></script>
  <script src="js/image_annotator/config.js"></script>
  <script src="js/main.js"></script>
</head>
<body>
  <p>Hello ImageAnnotatorJS</p>
  <canvas id="c" width="1000%" height="1000%" style="border:1px solid #ccc"></canvas>
</body>
</html>
```

- In main.js
```javascript
require([
    "jquery",
    "image_annotator",
], function (
    $,
    ImageAnnotator,
) {
    $(document).ready(function () {
        var image_annotator = new ImageAnnotator('c')
    });
});
```
The instance variable **image_annotator** provides list of API that give the developer the access to its functionalities.   

Here is the full API list. 

## API
- Restore the default setting - Drawing the shape of red square. 
```ecmascript 6
image_annotator.default()
```

- Chang the color of all the shapes in the current layer. 
```ecmascript 6
image_annotator.change_color(color)
```

- Switch to the square nib. 
```ecmascript 6
image_annotator.switch_square_nib()
```

- Switch to the polygon nib. 
```ecmascript 6
image_annotator.switch_polygon_nib()
```

- Switch to the previous layer. 
```ecmascript 6
image_annotator.switch_prev_layer()
```

- Switch to the next layer. 
```ecmascript 6
image_annotator.switch_next_layer()
```

- Clear the current layer. 
```ecmascript 6
image_annotator.clear_layer()
```

- Convert the coordination in each shape of the layers into the JSON object.  
```ecmascript 6
image_annotator.to_json()
```

- Using JSON object, rendering into the current layer. 
```ecmascript 6
image_annotator.from_json()
```
