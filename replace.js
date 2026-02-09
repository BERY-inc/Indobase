const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content
        .replace(/\bSupabase\b/g, 'Indobase')
        .replace(/\bsupabase\b/g, 'indobase');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Processed ${filePath}`);
}

function walkDir(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (file === 'node_modules') continue; // Skip node_modules
            try {
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    walkDir(filePath);
                } else if (['.md', '.mdx', '.tsx', '.jsx', '.html'].includes(path.extname(file))) {
                    replaceInFile(filePath);
                }
            } catch (err) {
                // Skip files/directories that can't be accessed
                console.log(`Skipping ${filePath}: ${err.message}`);
            }
        }
    } catch (err) {
        // Skip directories that can't be read
        console.log(`Skipping directory ${dir}: ${err.message}`);
    }
}

walkDir('.');
