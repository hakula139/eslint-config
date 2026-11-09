import type { Shape } from './shape.js';

export async function area(shape: Shape, _scale: number): Promise<number> {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
  }
}

export function describe(shape: Shape): string {
  const [_first, second] = shape.kind.split('');
  try {
    return `${shape.kind} with ${second} and ${area.length} parameters`;
  } catch (_error) {
    return shape.kind;
  }
}
