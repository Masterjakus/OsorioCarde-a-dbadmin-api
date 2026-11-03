import { AppDataSource } from "../config/data-source.js";
import { Producto } from "../entity/Producto.js";
export class ProductoRepository {
    repository = AppDataSource.getRepository(Producto);
    async findAll() {
        return await this.repository.find({
            relations: { categoria: true, detallesVenta: true }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { productoId: id },
            relations: { categoria: true, detallesVenta: true }
        });
    }
    async findByCategoria(categoriaId) {
        return await this.repository.find({
            where: { categoriaId },
            relations: { categoria: true }
        });
    }
    async save(producto) {
        return await this.repository.save(producto);
    }
    async create(productoData) {
        const producto = this.repository.create(productoData);
        return await this.repository.save(producto);
    }
    async update(id, productoData) {
        await this.repository.update(id, productoData);
        return await this.findById(id);
    }
    async updateStock(id, cantidad) {
        const producto = await this.findById(id);
        if (!producto)
            return null;
        producto.stock += cantidad;
        return await this.repository.save(producto);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
export const productoRepository = new ProductoRepository();
