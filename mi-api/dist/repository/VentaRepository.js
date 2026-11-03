import { AppDataSource } from "../config/data-source.js";
import { Venta } from "../entity/Venta.js";
export class VentaRepository {
    repository = AppDataSource.getRepository(Venta);
    async findAll() {
        return await this.repository.find({
            relations: { detalles: { producto: true } },
            order: { fecha: "DESC" }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { ventaId: id },
            relations: { detalles: { producto: { categoria: true } } }
        });
    }
    async findByCliente(cliente) {
        return await this.repository.find({
            where: { cliente },
            relations: { detalles: { producto: true } },
            order: { fecha: "DESC" }
        });
    }
    async findByFechaRange(fechaInicio, fechaFin) {
        return await this.repository
            .createQueryBuilder("venta")
            .leftJoinAndSelect("venta.detalles", "detalles")
            .leftJoinAndSelect("detalles.producto", "producto")
            .where("venta.fecha BETWEEN :fechaInicio AND :fechaFin", { fechaInicio, fechaFin })
            .orderBy("venta.fecha", "DESC")
            .getMany();
    }
    async save(venta) {
        return await this.repository.save(venta);
    }
    async create(ventaData) {
        const venta = this.repository.create(ventaData);
        return await this.repository.save(venta);
    }
    async update(id, ventaData) {
        await this.repository.update(id, ventaData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
export const ventaRepository = new VentaRepository();
