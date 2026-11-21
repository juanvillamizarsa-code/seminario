/* Inventario Fácil - lógica de las operaciones CRUD */
const STORAGE_KEY = "inventario_facil_productos";
let productos = cargarProductos();

const elementos = {
  tabla: document.getElementById("tablaProductos"),
  empty: document.getElementById("emptyState"),
  modal: document.getElementById("modalProducto"),
  form: document.getElementById("formProducto"),
  buscar: document.getElementById("buscar"),
  toast: document.getElementById("toast")
};

// Se cargan algunos datos de ejemplo únicamente la primera vez.
function cargarProductos() {
  const guardados = localStorage.getItem(STORAGE_KEY);
  if (guardados !== null) {
    try { return JSON.parse(guardados); } catch (error) { return []; }
  }
  const ejemplos = [
    {id: 1, nombre: "Teclado inalámbrico", categoria: "Tecnología", precio: 85000, cantidad: 14, descripcion: "Teclado compacto"},
    {id: 2, nombre: "Cuaderno universitario", categoria: "Oficina", precio: 12000, cantidad: 32, descripcion: "Cuaderno de 100 hojas"},
    {id: 3, nombre: "Lámpara de escritorio", categoria: "Hogar", precio: 56000, cantidad: 4, descripcion: "Luz LED"}
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ejemplos));
  return ejemplos;
}

function guardarDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

function formatoCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(valor);
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[caracter]);
}

// READ: muestra los productos y permite aplicar el filtro de búsqueda.
function mostrarProductos(filtro = "") {
  const termino = filtro.trim().toLocaleLowerCase("es");
  const filtrados = productos.filter(p =>
    p.nombre.toLocaleLowerCase("es").includes(termino) ||
    p.categoria.toLocaleLowerCase("es").includes(termino)
  );

  elementos.tabla.innerHTML = filtrados.map(p => {
    const bajo = Number(p.cantidad) <= 5;
    return `<tr>
      <td><div class="product-cell"><div class="product-thumb">${escaparHTML(p.nombre.charAt(0).toUpperCase())}</div><div><strong>${escaparHTML(p.nombre)}</strong><small>${escaparHTML(p.descripcion || "Sin descripción")}</small></div></div></td>
      <td><span class="category-tag">${escaparHTML(p.categoria)}</span></td>
      <td><strong>${formatoCOP(Number(p.precio))}</strong></td>
      <td><span class="stock-tag ${bajo ? "stock-low" : "stock-ok"}">${Number(p.cantidad)} und.</span></td>
      <td><span class="status ${bajo ? "status-low" : "status-ok"}">${bajo ? "Stock bajo" : "Disponible"}</span></td>
      <td><div class="actions"><button class="icon-btn" title="Editar" aria-label="Editar ${escaparHTML(p.nombre)}" onclick="editarProducto(${p.id})">✎</button><button class="icon-btn delete" title="Eliminar" aria-label="Eliminar ${escaparHTML(p.nombre)}" onclick="eliminarProducto(${p.id})">⌫</button></div></td>
    </tr>`;
  }).join("");

  elementos.empty.style.display = filtrados.length ? "none" : "block";
  if (!productos.length) {
    elementos.empty.querySelector("strong").textContent = "No hay productos todavía";
    elementos.empty.querySelector("p").textContent = "Agrega tu primer producto para comenzar a administrar el inventario.";
  } else if (!filtrados.length) {
    elementos.empty.querySelector("strong").textContent = "No se encontraron resultados";
    elementos.empty.querySelector("p").textContent = "Prueba con otro nombre o categoría.";
  }
  document.getElementById("contador").textContent = `${filtrados.length} ${filtrados.length === 1 ? "producto" : "productos"}`;
  actualizarEstadisticas();
}

// Actualiza las tarjetas superiores a partir de los datos guardados.
function actualizarEstadisticas() {
  document.getElementById("totalProductos").textContent = productos.length;
  document.getElementById("totalUnidades").textContent = productos.reduce((s, p) => s + Number(p.cantidad), 0);
  const valor = productos.reduce((s, p) => s + Number(p.precio) * Number(p.cantidad), 0);
  document.getElementById("valorInventario").textContent = formatoCOP(valor);
  document.getElementById("stockBajo").textContent = productos.filter(p => Number(p.cantidad) <= 5).length;
}

function abrirModal(producto = null) {
  elementos.form.reset();
  document.getElementById("mensajeError").textContent = "";
  document.getElementById("productoId").value = producto ? producto.id : "";
  document.getElementById("modalTitulo").textContent = producto ? "Editar producto" : "Nuevo producto";
  if (producto) {
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("descripcion").value = producto.descripcion || "";
  }
  elementos.modal.classList.add("show");
  elementos.modal.setAttribute("aria-hidden", "false");
  document.getElementById("nombre").focus();
}

function cerrarModal() {
  elementos.modal.classList.remove("show");
  elementos.modal.setAttribute("aria-hidden", "true");
}

// CREATE y UPDATE: el mismo formulario identifica si se crea o edita.
elementos.form.addEventListener("submit", evento => {
  evento.preventDefault();
  const idActual = document.getElementById("productoId").value;
  const nombre = document.getElementById("nombre").value.trim();
  const categoria = document.getElementById("categoria").value;
  const precio = Number(document.getElementById("precio").value);
  const cantidad = Number(document.getElementById("cantidad").value);
  const descripcion = document.getElementById("descripcion").value.trim();

  if (!nombre || !categoria || !Number.isFinite(precio) || precio <= 0 ||
      !Number.isInteger(cantidad) || cantidad < 0) {
    document.getElementById("mensajeError").textContent = "Revisa los datos: el precio debe ser mayor que cero y la cantidad un entero igual o mayor que cero.";
    return;
  }

  if (idActual) {
    const indice = productos.findIndex(p => p.id === Number(idActual));
    if (indice !== -1) {
      productos[indice] = {...productos[indice], nombre, categoria, precio, cantidad, descripcion};
      notificar("Producto actualizado correctamente.");
    }
  } else {
    productos.push({id: Date.now(), nombre, categoria, precio, cantidad, descripcion});
    notificar("Producto registrado correctamente.");
  }
  guardarDatos();
  mostrarProductos(elementos.buscar.value);
  cerrarModal();
});

// UPDATE: busca el registro seleccionado y lo carga en el formulario.
function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) abrirModal(producto);
}

// DELETE: solicita confirmación antes de borrar un registro.
function eliminarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  if (confirm(`¿Seguro que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) {
    productos = productos.filter(p => p.id !== id);
    guardarDatos();
    mostrarProductos(elementos.buscar.value);
    notificar("Producto eliminado.");
  }
}

function notificar(mensaje) {
  elementos.toast.textContent = mensaje;
  elementos.toast.classList.add("show");
  clearTimeout(notificar.temporizador);
  notificar.temporizador = setTimeout(() => elementos.toast.classList.remove("show"), 2600);
}

document.getElementById("btnNuevo").addEventListener("click", () => abrirModal());
document.getElementById("btnEmpty").addEventListener("click", () => abrirModal());
document.getElementById("btnCerrar").addEventListener("click", cerrarModal);
document.getElementById("btnCancelar").addEventListener("click", cerrarModal);
elementos.buscar.addEventListener("input", e => mostrarProductos(e.target.value));
elementos.modal.addEventListener("click", e => { if (e.target === elementos.modal) cerrarModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });

// Exponer funciones para los botones de cada fila.
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;

mostrarProductos();
