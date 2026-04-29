# Iconos PWA

TEMPLE necesita dos iconos PWA en formato PNG:

- `icon-192.png` - 192x192 píxeles
- `icon-512.png` - 512x512 píxeles

## Diseño

Los iconos deben seguir la identidad visual de TEMPLE:
- Fondo: `#0A0A0A` (negro)
- Texto: "T" en blanco (Inter, bold)
- Sin bordes, sin sombras
- Minimalista y limpio

## Generación

Puedes generar estos iconos usando:
1. Figma o Adobe Illustrator
2. Herramientas online como [favicon.io](https://favicon.io)
3. Script con Sharp (Node.js)

## Script de generación (opcional)

```bash
npm install sharp
node scripts/generate-icons.js
```

El script tomará un SVG base y generará los PNGs necesarios.
