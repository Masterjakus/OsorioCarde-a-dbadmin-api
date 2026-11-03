import { AppDataSource } from "../config/data-source.js";
import { Categoria } from "../entity/Categoria.js";
export class CategoriaRepository {
    repository = AppDataSource.getRepository(Categoria);
    async findAll() {
        return await this.repository.find({
            relations: { productos: true }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { categoriaId: id },
            relations: { productos: true }
        });
    }
    async findByNombre(nombre) {
        return await this.repository.findOne({
            where: { nombre },
            relations: { productos: true }
        });
    }
    async save(categoria) {
        return await this.repository.save(categoria);
    }
    async create(categoriaData) {
        const categoria = this.repository.create(categoriaData);
        return await this.repository.save(categoria);
    }
    async update(id, categoriaData) {
        await this.repository.update(id, categoriaData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
export const categoriaRepository = new CategoriaRepository();
