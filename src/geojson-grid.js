var lon = -101.82621802229870000;
var lat = 47.86922263695662800;

var zoom = 7;
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
                url: 'data/TPDtest7.kml',
                format: new OpenLayers.Format.KML({
                    extractStyles: true,
                    extractAttributes: true,
                    maxDepth: 2
                })
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]        
        }
    ); 
   map.addLayer(vector_layer);
//   vector_layer.addFeatures(geojson_format.read(areaOfInterest));

}
