import { writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert';

var count = 0;
let total = 1;
const unused = 2;
const name = 'example';
const record = { name: name };

if (count == total) throw 'mismatch';

debugger;

export { assert, readFile, record, writeFile };
