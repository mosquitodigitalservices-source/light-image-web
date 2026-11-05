# Codificadores de terceros

Copiados sin cambios de npm (versiones fijadas, huella sha512 verificada contra el registro):

| Carpeta | Paquete | Licencia |
| --- | --- | --- |
| `jpeg/` | @jsquash/jpeg 1.6.0 (MozJPEG) | Apache-2.0, ver `LICENSE` y `codec/LICENSE.codec.md` |
| `webp/` | @jsquash/webp 1.5.0 (libwebp) | Apache-2.0, ver `LICENSE` y `codec/LICENSE.codec.md` |
| `png/` | @jsquash/png 3.1.1 | Apache-2.0, ver `LICENSE` y `codec/LICENSE.codec.md` |
| `oxipng/` | @jsquash/oxipng 2.3.0 (solo la versión de un hilo) | Apache-2.0, ver `LICENSE` y `codec/LICENSE.codec.md` |
| `wasm-feature-detect/` | wasm-feature-detect 1.9.0 (`dist/esm/index.js`) | Apache-2.0 |

Único cambio: en `webp/encode.js` la importación `'wasm-feature-detect'` apunta a `'../wasm-feature-detect/index.js'`, porque el navegador no resuelve nombres de paquete.
