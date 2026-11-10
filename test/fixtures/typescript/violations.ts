import { type Circle, Shape, unitCircle } from './shape.js';

export type point = { x: number };

export function describe(shape: Shape, label: string | undefined, verbose: boolean): string {
  const unused = 0;
  const fallback: Circle = unitCircle;
  let text = label ?? fallback.kind;
  text += label!;
  text += label as string;
  text += ` verbose: ${verbose}`;
  switch (shape.kind) {
    case 'circle':
      text += ` radius ${shape.radius}`;
      break;
  }
  if (text.length === 0) {
    throw 'empty';
  }
  return text;
}
