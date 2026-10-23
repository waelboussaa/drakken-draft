import DottedMap from "dotted-map";

// Built once per server process; the dot grid never changes.
const map = new DottedMap({ height: 80, grid: "diagonal" });

export const mapSvg = map.getSVG({ radius: 0.24, color: "#1d3d34", shape: "circle" });

/** Position of a lat/lon on the map, as percentages of its box. */
export function project(lat: number, lon: number) {
  const p = map.getPin({ lat, lng: lon });
  if (!p) return null;
  return { left: (p.x / map.image.width) * 100, top: (p.y / map.image.height) * 100 };
}
