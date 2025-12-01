// Image size
const imgWidth = 1582;
const imgHeight = 2048;

// Create Leaflet map with no geographic CRS
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -4
});

// Image bounds
const bounds = [[0, 0], [imgHeight, imgWidth]];

// Add your custom hand-drawn map image
L.imageOverlay("TreeofLife.png", bounds).addTo(map);
map.fitBounds(bounds);

// Add markers from markers.js
markers.forEach(m => {
  const marker = L.circleMarker([m.y, m.x], {
    radius: 10,
    color: "#3f3939ff",
    fillColor: "#4a4646ff",
    fillOpacity: 0.5
  }).addTo(map);

  marker.on("click", () => {
    openSidebarFromFile(m.file);
  });
});

// Fix Leaflet render shift
setTimeout(() => map.invalidateSize(), 200);
