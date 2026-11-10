import type { Shape } from './shape.js';
import { unitCircle } from './shape.js';

type _Unused = number;

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
  const { kind, ...rest } = shape;
  try {
    return `${shape.kind} with ${second}, ${Object.keys(rest).length} fields, and ${unitCircle.radius} unit`;
  } catch (_error) {
    return shape.kind;
  }
}
