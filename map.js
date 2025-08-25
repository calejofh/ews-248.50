// Inicialización del mapa
var map = L.map('map').setView([-0.47, -76.99], 14);

// Capas base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});
var esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles © Esri — World Imagery' }
).addTo(map);
var esriLabels = L.tileLayer(
  'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  { attribution: '© Esri', opacity: 0.9 }
);

// Layer 1: ejemplo barrios afectados
var barriosAfectados = {"type":"FeatureCollection","features":[]};
var layer1 = L.geoJSON(barriosAfectados, {
  style: { color: "red", weight: 2, fillColor: "pink", fillOpacity: 0.5 }
}).addTo(map);

// Layer 2: Red Hídrica (desde red_hidrica.js)
var layer2 = L.geoJSON(redHidrica, {
  style: { color: "blue", weight: 2, fillColor: "blue", fillOpacity: 0.5 }
}).addTo(map);

// Control de capas
var baseMaps = { "ESRI Satélite": esriSat, "OSM": osm };
var overlayMaps = {
  "Etiquetas Esri": esriLabels,
  "Barrios afectados": layer1,
  "Red Hídrica": layer2
};
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
