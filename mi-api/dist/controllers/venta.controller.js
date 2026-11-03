import { ventaRepository } from "../repository/VentaRepository.js";
// GETALL: Obtener todas las ventas
export const getAllVentas = async (req, resp) => {
    try {
        const ventas = await ventaRepository.findAll();
        return resp.status(200).json({
            status: 200,
            message: "Ventas obtenidas exitosamente",
            data: ventas,
        });
    }
    catch (error) {
        return resp.status(500).json({
            status: 500,
            message: "Error al obtener las ventas",
            error: error.message,
        });
    }
};
// GETBYID: Obtener una venta por ID
export const getVentaById = async (req, resp) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }
        const venta = await ventaRepository.findById(id);
        if (!venta) {
            return resp.status(404).json({
                status: 404,
                message: "Venta no encontrada",
            });
        }
        return resp.status(200).json({
            status: 200,
            message: "Venta encontrada",
            data: venta,
        });
    }
    catch (error) {
        return resp.status(500).json({
            status: 500,
            message: "Error al obtener la venta",
            error: error.message,
        });
    }
};
// POST: Crear una nueva venta
export const createVenta = async (req, resp) => {
    try {
        const { cliente, total, fecha, detalles } = req.body;
        if (!cliente) {
            return resp.status(400).json({
                status: 400,
                message: "El campo 'cliente' es requerido",
            });
        }
        let calculatedTotal = total;
        if (calculatedTotal === undefined || calculatedTotal === null) {
            if (Array.isArray(detalles) && detalles.length > 0) {
                calculatedTotal = detalles.reduce((acc, item) => {
                    const subtotal = item.subtotal !== undefined
                        ? Number(item.subtotal)
                        : (Number(item.cantidad || 0) * Number(item.precioUnitario || 0));
                    return acc + subtotal;
                }, 0);
            }
            else {
                calculatedTotal = 0.00;
            }
        }
        const ventaData = {
            cliente,
            total: Number(calculatedTotal),
        };
        if (fecha) {
            ventaData.fecha = new Date(fecha);
        }
        if (Array.isArray(detalles)) {
            ventaData.detalles = detalles.map((d) => ({
                ...d,
                cantidad: Number(d.cantidad),
                precioUnitario: Number(d.precioUnitario),
                subtotal: d.subtotal !== undefined
                    ? Number(d.subtotal)
                    : (Number(d.cantidad) * Number(d.precioUnitario)),
            }));
        }
        const nuevaVenta = await ventaRepository.create(ventaData);
        return resp.status(201).json({
            status: 201,
            message: "Venta creada exitosamente",
            data: nuevaVenta,
        });
    }
    catch (error) {
        return resp.status(500).json({
            status: 500,
            message: "Error al crear la venta",
            error: error.message,
        });
    }
};
// PUT: Actualizar una venta existente
export const updateVenta = async (req, resp) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }
        const ventaExistente = await ventaRepository.findById(id);
        if (!ventaExistente) {
            return resp.status(404).json({
                status: 404,
                message: "Venta no encontrada",
            });
        }
        const { cliente, total, fecha } = req.body;
        const updateData = {};
        if (cliente !== undefined)
            updateData.cliente = cliente;
        if (total !== undefined)
            updateData.total = Number(total);
        if (fecha !== undefined)
            updateData.fecha = new Date(fecha);
        const ventaActualizada = Object.keys(updateData).length > 0
            ? await ventaRepository.update(id, updateData)
            : ventaExistente;
        return resp.status(200).json({
            status: 200,
            message: "Venta actualizada exitosamente",
            data: ventaActualizada,
        });
    }
    catch (error) {
        return resp.status(500).json({
            status: 500,
            message: "Error al actualizar la venta",
            error: error.message,
        });
    }
};
// DELETE: Eliminar una venta
export const deleteVenta = async (req, resp) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return resp.status(400).json({
                status: 400,
                message: "El ID proporcionado no es válido",
            });
        }
        const ventaExistente = await ventaRepository.findById(id);
        if (!ventaExistente) {
            return resp.status(404).json({
                status: 404,
                message: "Venta no encontrada",
            });
        }
        const eliminada = await ventaRepository.delete(id);
        if (!eliminada) {
            return resp.status(400).json({
                status: 400,
                message: "No se pudo eliminar la venta",
            });
        }
        return resp.status(200).json({
            status: 200,
            message: "Venta eliminada exitosamente",
        });
    }
    catch (error) {
        return resp.status(500).json({
            status: 500,
            message: "Error al eliminar la venta",
            error: error.message,
        });
    }
};
// Alias para compatibilidad y conveniencia
export const getVentas = getAllVentas;
export const getVenta = getVentaById;
