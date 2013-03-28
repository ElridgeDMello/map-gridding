var lon = -112.169 ;//7.26332822974839140;
var lat = 36.099;//8.35377187043956230;

var zoom = 11; //7;
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
                url: 'data/kml/lines.kml',
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
