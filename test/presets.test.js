import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';

import { ESLint } from 'eslint';

const root = path.resolve(import.meta.dirname, '..');
const fixtures = path.join(root, 'test', 'fixtures');

const cases = [
  {
    name: 'base reports its rules',
    preset: 'base',
    file: 'violations.js',
    expected: [
      'curly',
      'eqeqeq',
      'no-debugger',
      'no-throw-literal',
      'no-unused-vars',
      'no-var',
      'object-shorthand',
      'perfectionist/sort-imports',
      'perfectionist/sort-named-imports',
      'prefer-const',
    ],
  },
  {
    name: 'base accepts conforming code',
    preset: 'base',
    file: 'clean.js',
    expected: [],
  },
  {
    name: 'typescript reports its rules',
    preset: 'typescript',
    file: 'violations.ts',
    expected: [
      '@typescript-eslint/consistent-type-imports',
      '@typescript-eslint/no-non-null-assertion',
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/only-throw-error',
      '@typescript-eslint/restrict-template-expressions',
      '@typescript-eslint/switch-exhaustiveness-check',
    ],
  },
  {
    name: 'typescript accepts conforming code',
    preset: 'typescript',
    file: 'clean.ts',
    expected: [],
  },
];

for (const { name, preset, file, expected } of cases) {
  test(name, async () => {
    const eslint = new ESLint({
      cwd: root,
      overrideConfigFile: path.join(fixtures, preset, 'eslint.config.js'),
    });

    const [result] = await eslint.lintFiles([path.join(fixtures, preset, file)]);

    const reported = new Set(result.messages.map((message) => message.ruleId ?? message.message));
    assert.deepEqual([...reported].sort(), expected);
  });
}
