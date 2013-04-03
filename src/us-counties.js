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
                url: 'data/gz_2010_us_050_00_500k.json',
                format: new OpenLayers.Format.GeoJSON({})
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]        
        }
    );

    var vector_style = new OpenLayers.Style();
    var rule_county_low = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LESS_THAN,
            property: 'COUNTY',
            value: 25
        }),
        symbolizer: {
            fillColor: "#ababab",
            fillOpacity: .8,
        }
    });

    var rule_county_mid = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.BETWEEN,
            property: 'COUNTY',
            lowerBoundary: 26,
            upperBoundary: 100
        }),
        symbolizer: {
            fillColor: "#aaee77",
            fillOpacity: .8,
        }
    });

    var rule_county_high = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.GREATER_THAN,
            property: 'COUNTY',
            value: 100
        }),
        symbolizer: {
            fillColor: "#BD1922",
            fillOpacity: .8,
        }
    });

    vector_style.addRules([rule_county_low, rule_county_mid, rule_county_high]);

    var vector_style_map = new OpenLayers.StyleMap({
        'default': vector_style    
    });
    vector_layer.styleMap = vector_style_map;

    map.addLayer(vector_layer);
}
