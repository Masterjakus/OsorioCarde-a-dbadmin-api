var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Venta } from "./Venta.js";
import { Producto } from "./Producto.js";
let DetalleVenta = class DetalleVenta {
    detalleId;
    ventaId;
    productoId;
    cantidad;
    precioUnitario;
    subtotal;
    // Relación Muchos a Uno con Venta
    venta;
    // Relación Muchos a Uno con Producto
    producto;
};
__decorate([
    PrimaryGeneratedColumn({ name: "detalle_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "detalleId", void 0);
__decorate([
    Column({ name: "venta_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "ventaId", void 0);
__decorate([
    Column({ name: "producto_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "productoId", void 0);
__decorate([
    Column({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "cantidad", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2, name: "precio_unitario", nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "precioUnitario", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "subtotal", void 0);
__decorate([
    ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: "CASCADE" }),
    JoinColumn({ name: "venta_id" }),
    __metadata("design:type", Venta)
], DetalleVenta.prototype, "venta", void 0);
__decorate([
    ManyToOne(() => Producto, (producto) => producto.detallesVenta),
    JoinColumn({ name: "producto_id" }),
    __metadata("design:type", Producto)
], DetalleVenta.prototype, "producto", void 0);
DetalleVenta = __decorate([
    Entity("detalle_ventas")
], DetalleVenta);
export { DetalleVenta };
