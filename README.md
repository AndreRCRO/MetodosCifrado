# Proyecto de Sistemas - Métodos de Cifrado

Este proyecto implementa diferentes métodos de cifrado de texto con soporte para múltiples formatos de archivo.

## 🚀 Funcionalidades

### Métodos de Cifrado
- **César Clásico**: Desplaza letras del alfabeto A-Z
- **Desplazamiento ASCII**: Afecta todos los caracteres ASCII (símbolos, espacios, saltos de línea)

### Formatos de Archivo Soportados
- **TXT**: Archivos de texto plano
- **DOCX**: Documentos de Microsoft Word
- **PPTX**: Presentaciones de Microsoft PowerPoint

### Características
- ✅ Carga directa de archivos TXT, DOCX y PPTX
- ✅ Extracción automática de texto de documentos
- ✅ Cifrado y descifrado con desplazamiento configurable
- ✅ Descarga del resultado en el formato original
- ✅ Interfaz moderna y responsive con Tailwind CSS

## 📦 Instalación

```bash
npm install
```

## 🚀 Uso

```bash
npm run dev
```

## 💡 Cómo Usar

1. **Selecciona el modo**: Cifrar o Descifrar
2. **Elige el método**: César clásico o Desplazamiento ASCII
3. **Configura el desplazamiento**: Número entero (ej: 3, 6, 13)
4. **Carga un archivo**: Arrastra o selecciona un archivo .txt, .docx o .pptx
5. **Procesa**: Haz clic en "Cifrar" o "Descifrar"
6. **Descarga**: Descarga el resultado en el formato original

## 🔧 Dependencias Principales

- `mammoth`: Para extraer texto de archivos DOCX
- `pptx-parser`: Para extraer texto de archivos PPTX
- `docx`: Para generar archivos DOCX cifrados
- `pptxgenjs`: Para generar archivos PPTX cifrados

## 📝 Notas Técnicas

- Los archivos PPTX se dividen automáticamente en múltiples diapositivas si el texto es muy largo
- Los archivos DOCX mantienen el formato de párrafos
- Todos los archivos se descargan con el sufijo "_cifrado" o "_descifrado"

## 🎯 Casos de Uso

- **Estudiantes**: Cifrar documentos académicos
- **Desarrolladores**: Probar métodos de cifrado
- **Educación**: Aprender sobre criptografía básica
- **Investigación**: Experimentar con diferentes algoritmos de cifrado
