const sharp = require('sharp');
const fs = require('fs');

// Crear un SVG simple del logo
const svgLogo = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0A0A0A"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, sans-serif" font-size="320" font-weight="bold" fill="#FFFFFF">
    T
  </text>
</svg>
`;

async function generateIcons() {
  // Generar icono 512x512
  await sharp(Buffer.from(svgLogo))
    .resize(512, 512)
    .toFile('public/icons/icon-512.png');
  
  // Generar icono 192x192
  await sharp(Buffer.from(svgLogo))
    .resize(192, 192)
    .toFile('public/icons/icon-192.png');
  
  console.log('Iconos generados correctamente');
}

generateIcons().catch(console.error);
