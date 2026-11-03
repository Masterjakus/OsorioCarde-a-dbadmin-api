var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Categoria } from "./Categoria.js";
import { DetalleVenta } from "./DetalleVenta.js";
let Producto = class Producto {
    productoId;
    nombre;
    precio;
    stock;
    categoriaId;
    // Relación Muchos a Uno: Muchos productos pertenecen a una categoría
    categoria;
    // Relación Uno a Muchos: Un producto puede estar en varios detalles de venta
    detallesVenta;
};
__decorate([
    PrimaryGeneratedColumn({ name: "producto_id" }),
    __metadata("design:type", Number)
], Producto.prototype, "productoId", void 0);
__decorate([
    Column({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "stock", void 0);
__decorate([
    Column({ name: "categoria_id", nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "categoriaId", void 0);
__decorate([
    ManyToOne(() => Categoria, (categoria) => categoria.productos, { onDelete: "SET NULL" }),
    JoinColumn({ name: "categoria_id" }),
    __metadata("design:type", Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    OneToMany(() => DetalleVenta, (detalle) => detalle.producto),
    __metadata("design:type", Array)
], Producto.prototype, "detallesVenta", void 0);
Producto = __decorate([
    Entity("productos")
], Producto);
export { Producto };
