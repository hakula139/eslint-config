import { Shape } from './shape.js';

export function describe(shape: Shape, label: string | undefined, verbose: boolean): string {
  const unused = 0;
  let text = label!;
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
