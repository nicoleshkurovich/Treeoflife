// Shared red-circle icon for everything
const defaultIcon = L.divIcon({
  className: "marker-dot",
  iconSize: [18, 18]
});

// Custom icons per type (optional)
const markerIcons = {
  continuity: defaultIcon,
  ladybug: defaultIcon,
  cluster: defaultIcon,
  flower: defaultIcon,
  poppet: defaultIcon
};

// Popup templates per marker type
const markerPopups = {
  continuity: m => `
    <div style="font-weight:600">Continuity</div>
    <div style="font-size:12px;color:#666">x: ${m.x}, y: ${m.y}</div>
  `,

  ladybug: m => `
    <div style="font-weight:600">Ladybug</div>
    <div style="font-size:12px;color:#666">x: ${m.x}, y: ${m.y}</div>
  `,

  cluster: m => `
    <div style="font-weight:600">Cluster</div>
    <div style="font-size:12px;color:#666">x: ${m.x}, y: ${m.y}</div>
  `,

  flower: m => `
    <div style="font-weight:600">Flower</div>
    <div style="font-size:12px;color:#666">x: ${m.x}, y: ${m.y}</div>
  `,

  poppet: m => `
    <div style="font-weight:600">Poppet</div>
    <div style="font-size:12px;color:#666">x: ${m.x}, y: ${m.y}</div>
  `
};
