const fs = require('fs');
const path = require('path');

async function copyComponents() {
  const componentsDir = path.join(process.cwd(), 'content/posts/react-charts-guide/components');
  const generatedComponentsDir = path.join(process.cwd(), 'src/generated/components');

  console.log('Source components directory:', componentsDir);
  console.log('Destination components directory:', generatedComponentsDir);

  // Ensure the generated components directory exists
  if (!fs.existsSync(generatedComponentsDir)) {
    console.log('Creating generated components directory...');
    fs.mkdirSync(generatedComponentsDir, { recursive: true });
  }

  // Clear the generated directory first to avoid stale files
  console.log('Cleaning generated components directory...');
  const existingFiles = fs.readdirSync(generatedComponentsDir);
  for (const file of existingFiles) {
    const filePath = path.join(generatedComponentsDir, file);
    fs.unlinkSync(filePath);
    console.log(`Removed old file: ${filePath}`);
  }

  // Check if source directory exists
  if (!fs.existsSync(componentsDir)) {
    console.error('Source components directory does not exist:', componentsDir);
    process.exit(1);
  }

  console.log('Source components directory exists, reading files...');

  // Copy component files to the generated directory
  const files = fs.readdirSync(componentsDir);
  console.log('Found files in components directory:', files);

  if (files.length === 0) {
    console.error('No files found in components directory');
    process.exit(1);
  }

  // Create an index.ts file that re-exports all components
  let indexContent = '// Auto-generated file - do not edit\n\n';
  let copiedFiles = 0;

  for (const file of files) {
    // Skip non-component files
    if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.js') && !file.endsWith('.jsx')) {
      console.log(`Skipping non-component file: ${file}`);
      continue;
    }
    
    // Skip index files to prevent circular imports
    if (file === 'index.ts' || file === 'index.tsx' || file === 'index.js' || file === 'index.jsx') {
      console.log(`Skipping index file: ${file}`);
      continue;
    }
    
    try {
      // Define source and destination paths
      const sourcePath = path.join(componentsDir, file);
      const destPath = path.join(generatedComponentsDir, file);
      
      // Read the file content
      let content = fs.readFileSync(sourcePath, 'utf8');
      
      // Get the component name from the file name (without extension)
      const componentName = path.basename(file, path.extname(file));
      
      // Ensure the file has a default export
      if (!content.includes('export default')) {
        // If no default export, add both named and default exports
        content += `\n\nexport { ${componentName} }\nexport default ${componentName};`;
      } else if (!content.includes(`export { ${componentName} }`)) {
        // Add named export before the default export
        content = content.replace(
          /export default/g,
          `export { ${componentName} }\nexport default`
        );
      }
      
      // Write the file to the generated directory
      fs.writeFileSync(destPath, content);
      console.log(`Successfully processed ${file} to ${destPath}`);
      
      // Add export statement to index.ts
      indexContent += `export { default as ${componentName} } from './${componentName}'\n`;
      copiedFiles++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  // Write the index.ts file if we found any components
  if (copiedFiles > 0) {
    console.log(`Writing index.ts with ${copiedFiles} components...`);
    fs.writeFileSync(path.join(generatedComponentsDir, 'index.ts'), indexContent);
    console.log('Successfully created index.ts');
  } else {
    console.error('No components were copied, something went wrong');
    process.exit(1);
  }
}

copyComponents().catch(console.error);
