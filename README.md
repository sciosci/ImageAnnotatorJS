# ImageAnnotatorJS: A browser-based annotator for research integrity labeling and displaying

(c) 2020 Daniel E. Acuna and Jian Jian

## Authors
- [Jian Jian](https://www.linkedin.com/in/ken-j/), developer, Master's student, Syracuse University
- [Daniel Acuna](https://acuna.io), ideas, Assistant Professor, Syracuse University

## Funding
- This project has been partially funded by the Office of Research Integrity, Department of Health and Human Services, under grants ORIIIR190049 and ORIIR180041

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
### Specification of Module Definition
- AMD

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
<!--Core library reference-->
<script src="js/image_annotator/lib/require.js"></script>
<script src="js/image_annotator/config.js"></script>
<!--Application specific reference-->
<script src="js/image_annotator/main.js"></script>
``` 
### Write your own Hello ImageAnnotatorJS
- In main.html, you will need to include the above 3 scripts for accessing the features in ImageAnnotatorJS. 
- The first 2 are core libraries. The last one, main.js is the place your code should place at. 
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
```javascript
ImageAnnotator.default()
```

- Chang the color of all the shapes in the current layer. 
```javascript
ImageAnnotator.change_color(color)
```

- Switch to the square nib. 
```javascript
ImageAnnotator.switch_square_nib()
```

- Switch to the polygon nib. 
```javascript
ImageAnnotator.switch_polygon_nib()
```

- Switch to the previous layer. 
```javascript
ImageAnnotator.switch_prev_layer()
```

- Switch to the next layer. 
```javascript
ImageAnnotator.switch_next_layer()
```

- Clear the current layer. 
```javascript
ImageAnnotator.clear_layer()
```

- Convert the coordination in each shape of the layers into the JSON object.  
```javascript
ImageAnnotator.to_json()
```

- Using JSON object, rendering into the current layer. 
```javascript
ImageAnnotator.from_json()
```
