import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Copy files from dist/ to deploy/
function copyToDeploy() {
    const distDir = path.join(projectRoot, 'dist');
    const deployDir = path.join(projectRoot, 'deploy');

    // Ensure deploy directory exists
    if (!fs.existsSync(deployDir)) {
        fs.mkdirSync(deployDir, { recursive: true });
    }

    // Copy index.html if it exists
    const indexPath = path.join(projectRoot, 'deploy', 'index.html');
    if (!fs.existsSync(indexPath)) {
        // Create a simple index.html
        const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret Santa</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2rem;
        }
        .message {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎁 Secret Santa</h1>
        <p class="message">Please use the direct link provided to you to access your match.</p>
    </div>
</body>
</html>`;
        fs.writeFileSync(indexPath, indexContent, 'utf-8');
    }

    // Copy all HTML files from dist/ to deploy/
    const files = fs.readdirSync(distDir);
    let copiedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.html')) {
            const srcPath = path.join(distDir, file);
            const destPath = path.join(deployDir, file);
            fs.copyFileSync(srcPath, destPath);
            copiedCount++;
        }
    });

    console.log(`✅ Copied ${copiedCount} HTML file(s) to deploy/`);
    console.log('📦 Ready for deployment!');
    console.log('\nNext steps:');
    console.log('1. Push deploy/ folder to GitHub Pages or Netlify');
    console.log('2. Update [YOUR_SITE_URL] in distribution.txt');
    console.log('3. Send each person their URL and password');
}

copyToDeploy();

