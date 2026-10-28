/**
 * Original isometric line drawing of a consolidation yard: a shipping
 * container, pallets and stacks of cartons. Generated from simple box
 * geometry so it stays crisp at any size.
 */
type Box = [x: number, y: number, z: number, w: number, d: number, h: number];

const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);
const p = (x: number, y: number, z: number) => `${((x - y) * C).toFixed(1)},${((x + y) * S - z).toFixed(1)}`;

function faces([x, y, z, w, d, h]: Box) {
  const top = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  const left = [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  const right = [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)];
  return { top: top.join(" "), left: left.join(" "), right: right.join(" ") };
}

const boxes: Box[] = [];
// Shipping container with corrugation lines drawn separately.
const container: Box = [0, 0, 0, 240, 92, 96];
boxes.push(container);
// Pallets with carton stacks.
for (const [px, py] of [[290, 10], [290, 120], [400, 10], [180, 150]] as const) {
  boxes.push([px, py, 0, 90, 90, 10]);
  const layers = (px + py) % 3 === 0 ? 3 : 2;
  for (let l = 0; l < layers; l++)
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) boxes.push([px + 4 + i * 42, py + 4 + j * 42, 10 + l * 36, 40, 40, 36]);
}
// Loose cartons.
boxes.push([60, 140, 0, 50, 40, 40], [62, 142, 40, 44, 36, 30], [10, 190, 0, 46, 46, 46]);

// Paint far-to-near so outlines overlap naturally.
boxes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));

export function IsoScene({ className = "" }: { className?: string }) {
  const ribs = Array.from({ length: 15 }, (_, i) => 12 + i * 15);
  return (
    <svg viewBox="-260 -140 760 470" className={className} aria-hidden="true" focusable="false" fill="none">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        {boxes.map((b, i) => {
          const f = faces(b);
          return (
            <g key={i}>
              <polygon points={f.left} fill="var(--color-mist)" />
              <polygon points={f.right} fill="var(--color-mist)" />
              <polygon points={f.top} fill="white" />
            </g>
          );
        })}
        {ribs.map((x) => (
          <polyline key={x} points={`${p(x, 92, 6)} ${p(x, 92, 90)}`} strokeOpacity="0.55" />
        ))}
        <polyline points={`${p(240, 30, 8)} ${p(240, 30, 88)}`} />
        <polyline points={`${p(240, 62, 8)} ${p(240, 62, 88)}`} />
      </g>
    </svg>
  );
}
