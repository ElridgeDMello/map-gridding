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
   map.addLayer(vector_layer);
}
