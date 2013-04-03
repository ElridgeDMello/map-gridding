var lon = -98.82621802229870000;
var lat = 40.86922263695662800;

var zoom = 5;
var map, layer;

function init(){
    map = new OpenLayers.Map( 'map' );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0",
            {layers: 'basic'} );
    map.addLayer(layer);
    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);

    var vector_layer = new OpenLayers.Layer.Vector(
        'GridLayer',
        {
            protocol: new OpenLayers.Protocol.HTTP({
                url: 'data/gz_2010_us_050_00_5m.json',
                format: new OpenLayers.Format.GeoJSON({})
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]        
        }
    );

    var ranges = [        
        { minValue: 0, maxValue: 100, color: '#d10000' },
        { minValue: 101, maxValue: 300, color: '#ff6622' },
        { minValue: 301, maxValue: 500, color: '#ffda21' },
        { minValue: 501, maxValue: 700, color: '#33dd00' },
        { minValue: 701, maxValue: 900, color: '#1133cc' },
        { minValue: 901, maxValue: 1100, color: '#220066' },
        { minValue: 1101, maxValue: 150000, color: '#330044'}
    ];

    var vector_style = new OpenLayers.Style();
    var rules = [];

    for (var i=0; i < ranges.length; i++) {
        var rangeObject = ranges[i];
        var rule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: 'CENSUSAREA',
                lowerBoundary: rangeObject.minValue,
                upperBoundary: rangeObject.maxValue
            }),
            symbolizer: {
                fillColor: rangeObject.color,
                fillOpacity: .8,
            }
        });
        rules.push(rule);
    }

    vector_style.addRules(rules);

    var vector_style_map = new OpenLayers.StyleMap({
        'default': vector_style    
    });
    vector_layer.styleMap = vector_style_map;

    map.addLayer(vector_layer);

}

function findMinMaxArea() {

    var features = map.layers[1].features;

    console.log('in the find min max function, features.length: ' + features.length);
        
    var minMax = {
        min: 10000000, 
        max:0
    };

    for (var i=0; i < features.length; i++) {
        var feature = features[i];
        var area = feature.attributes.CENSUSAREA;
        if (minMax.min > area) {
            minMax.min = area;
        }
        if (minMax.max < area) {
            minMax.max = area;
        }    
    }

    console.log('min Area: ' + minMax.min);
    console.log('max Area: ' + minMax.max);

//    return minMax;
}
