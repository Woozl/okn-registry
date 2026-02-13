#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get file paths from command line arguments
const filePaths = process.argv.slice(2);

const results = [];
let allPassed = true;

for (const filePath of filePaths) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const isValid = validateQuery(content);
    const issues = isValid ? [] : ['error'];
    
    results.push({
      file: filePath,
      passed: isValid,
      issues: issues
    });
    
    if (!isValid) {
      allPassed = false;
    }
  } catch (error) {
    results.push({
      file: filePath,
      passed: false,
      issues: [`Error reading file: ${error.message}`]
    });
    allPassed = false;
  }
}

// Output markdown table
console.log('| File | Status | Issues |');
console.log('|------|--------|--------|');

for (const result of results) {
  const status = result.passed ? '✅' : '❌';
  const issues = result.issues.length > 0 ? result.issues.join(', ') : 'None';
  const fileName = path.relative(process.cwd(), result.file);
  console.log(`| ${fileName} | ${status} | ${issues} |`);
}

// Exit with appropriate code
process.exit(allPassed ? 0 : 1);

function validateQuery(content) {
  return false;
}