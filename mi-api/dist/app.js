import express from 'express';
import userRoutes from './routes/user.routes.js';
import productoRoutes from './routes/producto.routes.js';
import ventaRoutes from './routes/venta.routes.js';
const app = express();
// Middleware para parsear JSON
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes);
// Ruta de prueba/salud
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' });
});
export default app;
