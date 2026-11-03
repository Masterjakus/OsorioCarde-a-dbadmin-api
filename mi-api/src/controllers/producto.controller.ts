import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository.js";
import { Producto } from "../entity/Producto.js";

// GETALL: Obtener todos los productos
export const getAllProductos = async (req: Request, resp: Response) => {
    try {
        const productos = await productoRepository.findAll();
        return resp.status(200).json({
            status: 200,
            message: "Productos obtenidos exitosamente",
            data: productos,
        });
    } catch (error: any) {
        return resp.status(500).json({
            status: 500,
            message: "Error al obtener los productos",
            error: error.message,
        });
    }
};

// GETBYID: Obtener un producto por ID
export const getProductoById = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }

        const producto = await productoRepository.findById(id);

        if (!producto) {
            return resp.status(404).json({
                status: 404,
                message: "Producto no encontrado",
            });
        }

        return resp.status(200).json({
            status: 200,
            message: "Producto encontrado",
            data: producto,
        });
    } catch (error: any) {
        return resp.status(500).json({
            status: 500,
            message: "Error al obtener el producto",
            error: error.message,
        });
    }
};

// POST: Crear un nuevo producto
export const createProducto = async (req: Request, resp: Response) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body;

        if (!nombre || precio === undefined) {
            return resp.status(400).json({
                status: 400,
                message: "Los campos 'nombre' y 'precio' son requeridos",
            });
        }

        const nuevoProducto = await productoRepository.create({
            nombre,
            precio,
            stock: stock !== undefined ? stock : 0,
            categoriaId: categoriaId !== undefined ? categoriaId : undefined,
        });

        return resp.status(201).json({
            status: 201,
            message: "Producto creado exitosamente",
            data: nuevoProducto,
        });
    } catch (error: any) {
        return resp.status(500).json({
            status: 500,
            message: "Error al crear el producto",
            error: error.message,
        });
    }
};

// PUT: Actualizar un producto existente
export const updateProducto = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }

        const productoExistente = await productoRepository.findById(id);
        if (!productoExistente) {
            return resp.status(404).json({
                status: 404,
                message: "Producto no encontrado",
            });
        }

        const { nombre, precio, stock, categoriaId } = req.body;
        const updateData: Partial<Producto> = {};

        if (nombre !== undefined) updateData.nombre = nombre;
        if (precio !== undefined) updateData.precio = precio;
        if (stock !== undefined) updateData.stock = stock;
        if (categoriaId !== undefined) updateData.categoriaId = categoriaId;

        const productoActualizado = Object.keys(updateData).length > 0
            ? await productoRepository.update(id, updateData)
            : productoExistente;

        return resp.status(200).json({
            status: 200,
            message: "Producto actualizado exitosamente",
            data: productoActualizado,
        });
    } catch (error: any) {
        return resp.status(500).json({
            status: 500,
            message: "Error al actualizar el producto",
            error: error.message,
        });
    }
};

// DELETE: Eliminar un producto
export const deleteProducto = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }

        const productoExistente = await productoRepository.findById(id);
        if (!productoExistente) {
            return resp.status(404).json({
                status: 404,
                message: "Producto no encontrado",
            });
        }

        const eliminado = await productoRepository.delete(id);
        if (!eliminado) {
            return resp.status(400).json({
                status: 400,
                message: "No se pudo eliminar el producto",
            });
        }

        return resp.status(200).json({
            status: 200,
            message: "Producto eliminado exitosamente",
        });
    } catch (error: any) {
        return resp.status(500).json({
            status: 500,
            message: "Error al eliminar el producto",
            error: error.message,
        });
    }
};

// Alias para compatibilidad con código existente
export const getproducto = getProductoById;
export const getproducts = getAllProductos;
export const getProducto = getProductoById;
export const getProductos = getAllProductos;
