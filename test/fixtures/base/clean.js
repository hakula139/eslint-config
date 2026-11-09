import assert from 'node:assert';
import { readFile, writeFile } from 'node:fs/promises';

import js from '@eslint/js';

export function handle(context, _event) {
  const [_first, second] = context.items;
  const _unused = js;
  try {
    assert.ok(second);
  } catch (_error) {
    return readFile;
  }
  return writeFile;
}
