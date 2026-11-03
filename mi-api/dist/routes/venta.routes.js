import { Router } from "express";
import { getAllVentas, getVentaById, createVenta, updateVenta, deleteVenta } from "../controllers/venta.controller.js";
const router = Router();
// GETALL: Obtener todas las ventas
router.get('/ventas', getAllVentas);
router.get('/venta', getAllVentas);
// GETBYID: Obtener una venta por ID
router.get('/ventas/:id', getVentaById);
router.get('/venta/:id', getVentaById);
router.get('/Venta/:id', getVentaById);
// POST: Crear una venta
router.post('/ventas', createVenta);
router.post('/venta', createVenta);
// PUT: Actualizar una venta por ID
router.put('/ventas/:id', updateVenta);
router.put('/venta/:id', updateVenta);
// DELETE: Eliminar una venta por ID
router.delete('/ventas/:id', deleteVenta);
router.delete('/venta/:id', deleteVenta);
export default router;
