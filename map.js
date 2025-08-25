// Inicialización del mapa
var map = L.map('map', { zoomControl: true }).setView([-0.47, -76.99], 14);

// Capas base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map); // OSM por defecto

var esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles © Esri — World Imagery' }
);

// Layer 1: Barrios afectados (desde barrios_afectados.js)
var layer1 = L.geoJSON(barriosAfectados, {
  style: { color: "red", weight: 2, fillColor: "pink", fillOpacity: 0.5 },
  onEachFeature: function (feature, layer) {
    if (feature.properties && feature.properties.Layer) {
      layer.bindPopup("<b>" + feature.properties.Layer + "</b>");
    }
  }
}).addTo(map);

// Acomoda vista a barrios si existen
if (layer1 && layer1.getLayers().length) {
  map.fitBounds(layer1.getBounds(), { padding: [10, 10] });
}

// Layer 2: Red Hídrica (desde red_hidrica.js)
const WATER_COLOR = "blue";
const WATER_ALPHA  = 0.5;

var layer2 = L.geoJSON(redHidrica, {
  style: function () {
    return {
      color: WATER_COLOR,
      opacity: WATER_ALPHA,
      weight: 2,
      fill: true,
      fillColor: WATER_COLOR,
      fillOpacity: WATER_ALPHA
    };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup("<b>" + feature.properties.name + "</b>");
    }
  }
}).addTo(map);

// Controles
var baseMaps = { "OSM": osm, "ESRI Satélite": esriSat };
var overlayMaps = {
  "Barrios afectados": layer1,
  "Red Hídrica": layer2
};
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Asegurar que el mapa se ajuste al cambiar tamaño/orientación
function refreshMapSize(){
  setTimeout(function(){
    map.invalidateSize();
  }, 150);
}
window.addEventListener('resize', refreshMapSize);
window.addEventListener('orientationchange', refreshMapSize);
document.addEventListener('visibilitychange', function(){
  if (!document.hidden) refreshMapSize();
});
// Primera invalidación después de cargar DOM
setTimeout(refreshMapSize, 300);
