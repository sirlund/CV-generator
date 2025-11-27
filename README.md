# CV Generator

Generador de CV con múltiples versiones (Specialist / Lead) y exportación a PDF.

## Características

- 🔄 **Dos versiones del CV**: Alterna entre perfil "Specialist" y "Lead"
- 📄 **Exportación a PDF**: Usa `window.print()` para generar PDFs de alta calidad
- 🎨 **CSS limpio y organizado**: Código mantenible con secciones claras
- 📝 **Contenido desde Markdown**: Los perfiles se editan en `content/specialist.md` y `content/lead.md`
- 🔢 **Versionado automático**: Cada commit incrementa la versión automáticamente

## Estructura del Proyecto

```
CV-generator/
├── index.html          # Estructura del CV
├── styles.css          # Estilos (screen y print)
├── script.js           # Lógica de cambio de versión y PDF
├── content/
│   ├── specialist.md   # Contenido versión Specialist
│   └── lead.md         # Contenido versión Lead
└── .git/hooks/
    └── pre-commit      # Hook para auto-versioning
```

## Uso

### Ver el CV localmente
1. Abre `index.html` en tu navegador
2. Usa los botones "Specialist" / "Lead" para alternar versiones
3. Click en el botón de descarga (⬇) para exportar a PDF

### Exportar a PDF
1. Click en el botón de descarga
2. En el diálogo de impresión, selecciona "Guardar como PDF"
3. Ajusta márgenes si es necesario (recomendado: ninguno)
4. Guarda el archivo

## Versionado Automático

### ¿Cómo funciona?
Cada vez que haces un commit, un **git hook** (`pre-commit`) actualiza automáticamente:
- **Versión**: Incrementa el número minor (ej: v6.0 → v6.1)
- **Fecha**: Actualiza al mes/año actual en español

### Ejemplo
```bash
# Antes del commit
v6.0 • Noviembre 2025

# Después del commit
v6.1 • Noviembre 2025  (o Diciembre 2025 si cambió el mes)
```

### Proceso
1. Haces cambios en el código
2. `git add .`
3. `git commit -m "mensaje"`
4. **El hook se ejecuta automáticamente**:
   - Lee la versión actual
   - Incrementa +0.1
   - Actualiza la fecha
   - Agrega el cambio al commit
5. El commit se completa con la versión actualizada

### Desactivar temporalmente
Si quieres hacer un commit sin incrementar la versión:
```bash
git commit --no-verify -m "mensaje"
```

## Editar Contenido

### Actualizar información del CV
1. Edita `content/specialist.md` o `content/lead.md`
2. Copia el contenido actualizado al `index.html` correspondiente
3. Commit y el versionado se actualiza automáticamente

## Tecnologías

- HTML5 / CSS3
- JavaScript vanilla
- Google Fonts (Inter, Space Grotesk)
- Font Awesome (iconos)
- Git hooks (pre-commit)

## Notas

- El PDF usa texto real (no imágenes), por lo que es seleccionable y de alta calidad
- El sidebar se mantiene fijo en todas las páginas del PDF
- Los estilos de impresión están optimizados para A4
- Todo el texto en el PDF es negro puro (#000000) para mejor impresión

---

**Última versión**: v6.1 • Noviembre 2025
