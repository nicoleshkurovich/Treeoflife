// MAP SETUP
const imgWidth = 1582;
const imgHeight = 2048;

const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -4,
  maxZoom: 4,
  zoomSnap: 0
});

const bounds = [[0, 0], [imgHeight, imgWidth]];
L.imageOverlay("TreeofLife.png", bounds).addTo(map);
map.setView([imgHeight / 2, imgWidth / 2], -1.2);

// MARKER POSITIONS
const markerData = [
  { x: 761, y: 1966, key: "hamsa", zoom: -1 },
  { x: 481, y: 1646, key: "tiojack", zoom: 0 },
  { x: 399, y: 738, key: "missing" , zoom: -2 },
  { x: 540, y: 653, key: "colonizing" , zoom: -1  },
  { x: 851, y: 1454, key: "belgium" , zoom: 0 },
  { x: 1202, y: 1457, key: "distances" , zoom: -1 },
  { x: 1179, y: 1177, key: "serpinto" , zoom: 0 },
  { x: 837, y: 1035, key: "arrival", zoom: -1  },
  { x: 1030, y: 1437, key: "ladybug" , zoom: -1},
  { x: 557, y: 945, key: "sol", zoom: 0.5},
  { x: 1180, y: 950, key: "cactus", zoom: -1 },
  { x: 455, y: 1253, key: "bougainvillea", zoom: -1 },
  { x: 597, y: 546, key: "city", zoom: -1 },
  { x: 1024, y: 512, key: "chardon", zoom: 0 },
  { x: 877, y: 291, key: "futures" , zoom: -1 },
  { x: 605, y: 204, key: "ecology" , zoom: 0.5 },
  { x: 800, y: 792, key: "skeleton" , zoom: -0.5 },
  { x: 393, y: 1394, key: "pomegranate" , zoom: -1 },
  { x: 1100, y: 360, key: "offthemap", zoom: -1 }
];

// ICONS
const markerIcon = L.divIcon({
  className: "marker-icon",
  iconSize: [18, 18]
});

const ladybugIcon = L.icon({
  iconUrl: "Ladybug.png",
  iconSize: [40, 40],
  className: "ladybug-icon"
});

function zoomToMarker(lat, lng, zoomLevel) {
  // Clamp zoom to allowed range
  const finalZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), zoomLevel));

  map.flyTo([lat, lng], finalZoom, {
    animate: true,
    duration: 1.3,
    easeLinearity: 0.25
  });
}

document.getElementById("enterMapBtn").addEventListener("click", () => {
  const overlay = document.getElementById("landingOverlay");
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 500);
document.getElementById("homeButton").addEventListener("click", () => {
  const overlay = document.getElementById("landingOverlay");

  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });
});
});

// SIDEBAR ELEMENTS
const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebarTitle");
const sidebarContentBox = document.getElementById("sidebarContent");
document.getElementById("closeSidebar").onclick = () =>
  sidebar.classList.remove("open");

function playMediaInSidebar() {
  // Grab the first audio or video inside the sidebar
  const media = sidebarContentBox.querySelector("audio, video");

  if (media) {
    media.play().catch(err => {
      console.log("Autoplay blocked (browser policy):", err);
    });
  }
}

// LADYBUG MARKER
const ladybug = L.marker([markerData[0].y, markerData[0].x], {
  icon: ladybugIcon
}).addTo(map);

// OPEN SIDEBAR
function openSidebar(key) {
  const entry = sidebarContent[key];

  if (!entry) {
    console.warn("Missing sidebar entry for:", key);
    return;
  }

  sidebarTitle.textContent = entry.title;
  sidebarContentBox.innerHTML = entry.html;
  sidebar.classList.add("open");
}

// LADYBUG MOVEMENT
function moveLadybug(lat, lng) {
  const start = ladybug.getLatLng();
  const end = L.latLng(lat, lng);

  const dx = end.lng - start.lng;
  const dy = end.lat - start.lat;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const iconEl = document.querySelector(".ladybug-icon");
  if (iconEl) iconEl.style.transform = `rotate(${angle}deg)`;

  const duration = 800;
  const startTime = performance.now();

  function animate(t) {
    const progress = Math.min((t - startTime) / duration, 1);
    ladybug.setLatLng([
      start.lat + (end.lat - start.lat) * progress,
      start.lng + (end.lng - start.lng) * progress
    ]);

    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// CREATE MARKERS
markerData.forEach(pt => {
  const marker = L.marker([pt.y, pt.x], { icon: markerIcon }).addTo(map);

  marker.on("click", () => {
    openSidebar(pt.key);
    moveLadybug(pt.y, pt.x);
    zoomToMarker(pt.y, pt.x, pt.zoom);
    playMediaInSidebar();
  });
});
