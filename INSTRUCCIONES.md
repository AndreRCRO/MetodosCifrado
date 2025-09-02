# 📖 Instrucciones de Uso - Programa de Cifrado

## 🎯 ¿Qué hace este programa?

Este programa te permite **cifrar y descifrar texto** usando diferentes métodos de criptografía, y lo mejor de todo es que funciona con **archivos de texto (.txt), documentos de Word (.docx) y presentaciones de PowerPoint (.pptx)**.

## 🚀 Cómo empezar

### 1. Ejecutar el programa
```bash
npm run dev
```
El programa se abrirá en tu navegador (normalmente en http://localhost:5173)

### 2. Configurar el cifrado
- **Modo**: Elige entre "Cifrar" (para ocultar texto) o "Descifrar" (para revelar texto oculto)
- **Método**: 
  - **César clásico**: Solo mueve las letras A-Z (más simple)
  - **Desplazamiento ASCII**: Mueve TODOS los caracteres (más seguro)
- **Desplazamiento**: Número que determina cuánto se mueve cada letra (ej: 3, 6, 13)

## 📁 Cómo usar con diferentes archivos

### 📝 Archivos de texto (.txt)
1. Haz clic en "Subir archivo"
2. Selecciona tu archivo .txt
3. El texto aparecerá en el área de entrada
4. Haz clic en "Cifrar" o "Descifrar"
5. Descarga el resultado con "Descargar .txt"

### 📄 Documentos de Word (.docx)
1. Haz clic en "Subir archivo"
2. Selecciona tu archivo .docx
3. El programa extraerá automáticamente todo el texto
4. Haz clic en "Cifrar" o "Descifrar"
5. Descarga el resultado con "Descargar .docx"

### 🎭 Presentaciones PowerPoint (.pptx)
1. Haz clic en "Subir archivo"
2. Selecciona tu archivo .pptx
3. El programa extraerá el texto de todas las diapositivas
4. Haz clic en "Cifrar" o "Descifrar"
5. Descarga el resultado con "Descargar .pptx"

## 🔐 Ejemplos de cifrado

### César con desplazamiento 3:
- **Original**: "HOLA MUNDO"
- **Cifrado**: "KROD PXQGR"

### ASCII con desplazamiento 6:
- **Original**: "¡Hola! ¿Cómo estás?"
- **Cifrado**: "&Nvrg&'&Iusv&kyz&y"

## 💡 Consejos útiles

1. **Para cifrar**: Usa el mismo desplazamiento que usaste para cifrar
2. **Para descifrar**: Usa el mismo desplazamiento que usaste para cifrar
3. **Archivos grandes**: Los PPTX se dividen automáticamente en múltiples diapositivas
4. **Formato**: Los archivos mantienen su formato original (.docx, .pptx)

## 🚨 Solución de problemas

### "No se pudo leer el archivo"
- Verifica que el archivo no esté corrupto
- Asegúrate de que sea .txt, .docx o .pptx

### "No se pudo generar el archivo de salida"
- Verifica que tengas permisos de escritura en la carpeta
- Intenta con un archivo más pequeño

### El programa no se ejecuta
- Asegúrate de tener Node.js instalado
- Ejecuta `npm install` para instalar dependencias

## 🎓 Casos de uso reales

- **Estudiantes**: Cifrar trabajos académicos antes de enviarlos
- **Desarrolladores**: Probar algoritmos de cifrado
- **Educadores**: Enseñar criptografía básica
- **Investigadores**: Experimentar con diferentes métodos

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Este programa es para fines educativos. Los métodos de cifrado implementados son básicos y NO son seguros para información sensible o confidencial.

Para uso profesional, considera algoritmos más avanzados como AES, RSA, etc.
