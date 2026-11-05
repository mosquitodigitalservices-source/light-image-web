# Light Image · Color Palette

Extrae paletas de color de tus imágenes y expórtalas en un PDF A4 horizontal (4 imágenes por página).

Todo se procesa en el navegador: las imágenes no se suben a ningún servidor.

## Archivos

- `index.html`: página y estilos.
- `app.js`: lógica (importación, extracción de colores, vista previa y PDF).

La única dependencia externa es [jsPDF 2.5.1](https://github.com/parallax/jsPDF), cargada desde cdnjs con verificación de integridad (SRI). La página declara una Content Security Policy que solo permite scripts propios y de cdnjs, y no hace ninguna petición de red con tus datos.

## Probar en local

```bash
python3 -m http.server 8765
```

Abre http://localhost:8765.
