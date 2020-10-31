require.config({
    baseUrl: "js",
    paths: {
        'image_annotator':      'image_annotator',
        'jquery':               'image_annotator/lib/jquery-3.5.1.min',
        'popper':               'image_annotator/lib/popper.min',
        'fabric':               'image_annotator/lib/fabric',

    },
    shim: {
        'jquery': {
            exports: '$',
        },
        'image_annotator': {
            exports: 'ImageAnnotator',
        },
        'point': {
            exports: 'Point',
        },
    },
    map: {
        '*': {
            'popper.js':        'popper',
            'pen':              'image_annotator/component/pen',
            'point':            'image_annotator/component/point',
            'square_pen':       'image_annotator/component/square_pen',
            'polygon_pen':      'image_annotator/component/polygon_pen',
            'layer':            'image_annotator/model/layer',
            'shape':            'image_annotator/model/shape',
            'image_annotator':  'image_annotator/image_annotator',
        }
    }
})
