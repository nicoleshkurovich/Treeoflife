// ------------------------------
// 1. Setup map with a custom base image
// ------------------------------
const imgWidth = 1582;   // replace with your image width
const imgHeight = 2048;  // replace with your image height

const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -4,
  zoomControl: true
});

const bounds = [[0,0], [imgHeight, imgWidth]];

L.imageOverlay("images/tree-map.png", bounds).addTo(map);
map.fitBounds(bounds);

// ------------------------------
// 2. Marker data (edit these)
// ------------------------------
const points = [
  {
    name: "Origins",
    text: "Narrative for this location...",
    coords: [761, 1966]
  },
  {
    name: "Belgium",
    text: "Information about Belgium...",
    coords: [500, 700]
  },
  {
    name: "Morocco",
    text: "Something about Morocco...",
    coords: [900, 650]
  },
  {
    name: "Mexico",
    text: "Your note about Mexico...",
    coords: [1300, 450]
  },
  {
    name: "Los Angeles",
    text: "Final stop in Los Angeles...",
    coords: [1500, 300]
  }
];

// ------------------------------
// 3. Add markers + pop-out linking
// ------------------------------
points.forEach(p => {
  const marker = L.circleMarker(p.coords, {
    radius: 10,
    fillColor: "red",
    color: "#333",
    weight: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.on("click", () => {
    document.getElementById("sidebar-title").innerText = p.name;
    document.getElementById("sidebar-text").innerText = p.text;
  });
});
