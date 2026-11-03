import { Router } from "express";
import {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
} from "../controllers/producto.controller.js";

const router = Router();

// GETALL: Obtener todos los productos
router.get('/productos', getAllProductos);
router.get('/producto', getAllProductos);

// GETBYID: Obtener un producto por ID
router.get('/productos/:id', getProductoById);
router.get('/producto/:id', getProductoById);
router.get('/Producto/:id', getProductoById);

// POST: Crear un producto
router.post('/productos', createProducto);
router.post('/producto', createProducto);

// PUT: Actualizar un producto por ID
router.put('/productos/:id', updateProducto);
router.put('/producto/:id', updateProducto);

// DELETE: Eliminar un producto por ID
router.delete('/productos/:id', deleteProducto);
router.delete('/producto/:id', deleteProducto);

export default router;
