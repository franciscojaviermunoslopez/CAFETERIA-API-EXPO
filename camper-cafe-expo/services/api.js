
const API = 'https://jlorenzo.ddns.net/carta_restaurante';
const USUARIO = 9428;

// ========== CATEGORÍAS ==========

// Obtener todas las categorías
export async function getCategorias() {
    try {
        const response = await fetch(`${API}/categorias/?usuario_id=${USUARIO}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { status: 'error', message: error.message };
    }
}

// Crear categoría
export async function crearCategoria(nombre) {
    try {
        const response = await fetch(`${API}/categorias/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO, nombre: nombre })
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating category:", error);
        return { status: 'error', message: error.message };
    }
}

// Editar categoría
export async function editarCategoria(id, nombre) {
    try {
        const response = await fetch(`${API}/categorias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO, nombre: nombre })
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating category:", error);
        return { status: 'error', message: error.message };
    }
}

// Borrar categoría
export async function borrarCategoria(id) {
    try {
        const response = await fetch(`${API}/categorias/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting category:", error);
        return { status: 'error', message: error.message };
    }
}

// ========== PRODUCTOS ==========

// Obtener productos de una categoría
export async function getProductos(categoriaId) {
    try {
        const response = await fetch(`${API}/productos/${categoriaId}?usuario_id=${USUARIO}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return { status: 'error', message: error.message };
    }
}

// Crear producto
export async function crearProducto(categoriaId, nombre, precio) {
    try {
        const response = await fetch(`${API}/productos/${categoriaId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO, nombre: nombre, precio: precio })
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating product:", error);
        return { status: 'error', message: error.message };
    }
}

// Editar producto
export async function editarProducto(productoId, nombre, precio) {
    try {
        const response = await fetch(`${API}/productos/${productoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO, nombre: nombre, precio: precio })
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating product:", error);
        return { status: 'error', message: error.message };
    }
}

// Borrar producto
export async function borrarProducto(productoId) {
    try {
        const response = await fetch(`${API}/productos/${productoId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: USUARIO })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting product:", error);
        return { status: 'error', message: error.message };
    }
}
