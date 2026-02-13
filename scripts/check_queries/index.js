#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const workspace = process.argv[2];
const filePaths = process.argv.slice(3);

for (const filePath of filePaths) {
  try {
    const content = fs.readFileSync(path.join(workspace, filePath), 'utf8');

    console.log(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
}
