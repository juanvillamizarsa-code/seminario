# Inventario Fácil

Aplicación web académica para administrar productos de un inventario mediante las cuatro operaciones CRUD: crear, consultar, actualizar y eliminar.

## Descripción

Inventario Fácil permite registrar productos con nombre, categoría, precio, cantidad y descripción. Los registros se muestran en una tabla, se pueden buscar, editar y eliminar. El panel calcula automáticamente el número de referencias, las unidades disponibles, el valor total de existencias y los productos con stock bajo.

El proyecto está desarrollado con HTML, CSS y JavaScript. Utiliza `localStorage` del navegador para conservar la información en el mismo equipo y navegador, sin necesidad de instalar un servidor o configurar una base de datos.

## Tecnologías utilizadas

- HTML5: estructura y formularios.
- CSS3: diseño adaptable a escritorio y móvil.
- JavaScript: lógica de las operaciones CRUD, validaciones y estadísticas.
- localStorage: almacenamiento local de los productos.
- Git y GitHub: control de versiones y publicación del código.

## Estructura del proyecto

```text
Inventario_Facil/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── app.js
├── img/
│   └── capturas/
└── README.md
```

## Cómo ejecutar el proyecto

1. Descarga o clona este repositorio.
2. Abre la carpeta `Inventario_Facil` en Visual Studio Code.
3. Abre el archivo `index.html` en un navegador.
4. Para una experiencia cómoda, puedes usar la extensión **Live Server** de Visual Studio Code y seleccionar “Open with Live Server”.
5. Registra, edita y elimina productos. Los cambios quedan guardados en el navegador mediante localStorage.

No requiere instalación de dependencias ni conexión a un servidor.

## Funcionalidades CRUD

| Operación | Cómo se demuestra |
|---|---|
| Create (crear) | Botón “Nuevo producto” y formulario de registro. |
| Read (leer) | Tabla con los productos guardados y buscador. |
| Update (actualizar) | Botón de edición en cada fila; el formulario carga los datos actuales. |
| Delete (eliminar) | Botón de eliminación con confirmación previa. |

También incluye validación de campos, cálculo de estadísticas y aviso visual cuando el stock es de cinco unidades o menos.

## Prompts utilizados durante el desarrollo

Los siguientes prompts documentan la asistencia de IA utilizada para planear, construir y revisar el proyecto. Para la entrega, conserva los prompts que realmente utilizaste y puedes añadir capturas de la conversación con la herramienta de IA.

### Prompt 1. Planeación del proyecto
**Prompt:** “Propón una aplicación web CRUD sencilla para un trabajo universitario de Ingeniería de Software. Debe poder desarrollarse con HTML, CSS, JavaScript y localStorage, e incluir una idea fácil de explicar.”

**Objetivo:** seleccionar un alcance pequeño y viable, sin servidor ni base de datos externa.

### Prompt 2. Estructura HTML
**Prompt:** “Crea la estructura HTML de un sistema de inventario de productos con un panel de estadísticas, tabla, buscador y formulario para crear y editar productos. Usa etiquetas semánticas y accesibilidad básica.”

**Objetivo:** construir la interfaz y organizar los elementos que utiliza JavaScript.

### Prompt 3. Diseño CSS
**Prompt:** “Diseña una interfaz moderna y adaptable para el sistema de inventario. Usa una barra lateral, tarjetas de estadísticas, tabla limpia, formulario modal y estilos para pantallas pequeñas. Mantén una apariencia profesional y legible.”

**Objetivo:** mejorar la presentación visual y la experiencia de uso.

### Prompt 4. Funcionalidad CRUD
**Prompt:** “Implementa con JavaScript las operaciones crear, listar, actualizar y eliminar productos. Guarda los datos en localStorage y permite buscar por nombre o categoría.”

**Objetivo:** programar las operaciones principales y la persistencia local.

### Prompt 5. Validaciones y seguridad de visualización
**Prompt:** “Agrega validaciones para que el nombre y la categoría sean obligatorios, el precio sea mayor que cero y la cantidad sea un entero no negativo. Evita insertar directamente texto del usuario como HTML sin escaparlo.”

**Objetivo:** reducir errores de digitación y mejorar el tratamiento de los datos mostrados.

### Prompt 6. Refactorización y pruebas
**Prompt:** “Revisa el código JavaScript de la aplicación. Organiza las funciones, separa la carga y el guardado de datos, actualiza las estadísticas después de cada operación y verifica los casos de crear, editar, eliminar, buscar y recargar la página.”

**Objetivo:** revisar el comportamiento, mejorar el orden del código y comprobar el CRUD.

> Nota académica: los prompts anteriores describen las solicitudes utilizadas como guía para elaborar el proyecto. En el video explica qué partes revisaste y qué ajustes hiciste. No afirmes que realizaste pruebas que todavía no hayas ejecutado.

## Capturas de pantalla

Guarda aquí capturas propias de la aplicación ejecutándose y agrégalas al repositorio. Se recomiendan estas evidencias:

1. `img/capturas/01-panel.png`: panel principal y estadísticas.
2. `img/capturas/02-crear.png`: formulario de nuevo producto.
3. `img/capturas/03-listado.png`: tabla con varios productos.
4. `img/capturas/04-editar.png`: formulario con datos de un producto existente.
5. `img/capturas/05-eliminar.png`: confirmación de eliminación o tabla después de eliminar.

Cuando tengas las imágenes, puedes mostrarlas en esta sección con Markdown, por ejemplo:

```markdown
![Panel principal](img/capturas/01-panel.png)
```

## Consideraciones

- `localStorage` guarda los datos únicamente en el navegador y equipo donde se usa la aplicación.
- Si se borran los datos del navegador, los registros pueden perderse.
- Para usar información compartida entre varios usuarios sería necesario incorporar un backend y una base de datos.
- Los productos iniciales son datos de demostración y pueden editarse o eliminarse.

## Autor

Nombre del estudiante: **[Escribe aquí tu nombre]**  
Programa: **Ingeniería de Software**  
Seminario: **Gestión de Software Ágil asistido por Inteligencia Artificial**  
Institución: **[Escribe aquí el nombre de tu institución]**
