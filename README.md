# Light Image

Herramientas web de Light Image. Todo se procesa en el navegador: no se sube nada a ningún servidor.

## Herramientas

- **Color Palette** (`/`): extrae paletas de color de tus imágenes y las exporta en un PDF A4 horizontal (4 imágenes por página).
- **Disktree** (`/disktree/`): configura y genera la estructura de carpetas de un rodaje (proyecto, jornadas, secciones), con Next Shooting Day y templates.
  - En Chrome y Edge crea las carpetas directamente en el destino elegido y detecta las que ya existen.
  - En Safari, Firefox y el móvil descarga la estructura como ZIP.
  - Los templates se guardan en el navegador y se pueden exportar e importar en el mismo formato `templates.json` que la app de Mac.

## Archivos

- `styles.css`: estilos comunes.
- `index.html`, `app.js`: Color Palette.
- `disktree/index.html`, `disktree/disktree.js`, `disktree/disktree.css`: Disktree.

La única dependencia externa es [jsPDF 2.5.1](https://github.com/parallax/jsPDF) en Color Palette, cargada desde cdnjs con verificación de integridad (SRI). Cada página declara una Content Security Policy que solo permite sus propios scripts (y cdnjs en Color Palette), y no hace ninguna petición de red con tus datos.

## Probar en local

```bash
python3 -m http.server 8765
```

Abre http://localhost:8765.
