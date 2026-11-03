var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./Producto.js";
let Categoria = class Categoria {
    categoriaId;
    nombre;
    // Relación Uno a Muchos: Una categoría tiene muchos productos
    productos;
};
__decorate([
    PrimaryGeneratedColumn({ name: "categoria_id" }),
    __metadata("design:type", Number)
], Categoria.prototype, "categoriaId", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], Categoria.prototype, "nombre", void 0);
__decorate([
    OneToMany(() => Producto, (producto) => producto.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "productos", void 0);
Categoria = __decorate([
    Entity("categorias")
], Categoria);
export { Categoria };
