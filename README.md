# Light Image

Herramientas web de Light Image. Todo se procesa en el navegador: no se sube nada a ningún servidor.

## Herramientas

- **Color Palette** (`/`): extrae paletas de color de tus imágenes y las exporta en un PDF A4 horizontal (4 imágenes por página).
- **Disktree** (`/disktree/`): configura y genera la estructura de carpetas de un rodaje (proyecto, jornadas, secciones), con Next Shooting Day y templates.
  - En Chrome y Edge crea las carpetas directamente en el destino elegido y detecta las que ya existen.
  - En Safari, Firefox y el móvil descarga la estructura como ZIP.
  - Los templates se guardan en el navegador y se pueden exportar e importar en el mismo formato `templates.json` que la app de Mac.
- **Compressor** (`/compressor/`): comprime imágenes JPEG, PNG, WebP y HEIC sin cambiar sus dimensiones, con los mismos presets que la app (Lossless, High Quality, Balanced, Small File, Custom).
  - Usa MozJPEG, libwebp y OxiPNG en WebAssembly, alojados en `compressor/vendor/` (ver su README y licencias).
  - Conserva el EXIF, el XMP y el perfil ICC si se piden; sin metadatos solo mantiene la orientación.
  - En Chrome y Edge guarda `nombre_compressed.ext` en la carpeta elegida sin sobrescribir nada; sin carpeta, o en otros navegadores, descarga un ZIP.
  - HEIC solo se puede abrir en Safari.

## Archivos

- `styles.css`: estilos comunes.
- `index.html`, `app.js`: Color Palette.
- `disktree/index.html`, `disktree/disktree.js`, `disktree/disktree.css`: Disktree.
- `compressor/`: Compressor (`compressor.js` la página, `worker.js` la compresión, `metadata.js` EXIF/XMP/ICC, `vendor/` los codificadores).

La única dependencia cargada desde fuera es [jsPDF 2.5.1](https://github.com/parallax/jsPDF) en Color Palette, desde cdnjs con verificación de integridad (SRI). Los codificadores de Compressor están copiados en el repositorio. Cada página declara una Content Security Policy que solo permite sus propios scripts (y cdnjs en Color Palette), y no hace ninguna petición de red con tus datos.

## Probar en local

```bash
python3 -m http.server 8765
```

Abre http://localhost:8765.
