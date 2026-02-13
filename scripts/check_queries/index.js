#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePaths = process.argv.slice(2);

for (const filePath of filePaths) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
}
