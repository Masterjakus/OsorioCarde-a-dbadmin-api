import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";
export const AppDataSource = new DataSource({
    type: "mysql", // O "mariadb"
    host: "localhost",
    port: 3306,
    username: "tu_usuario",
    password: "tu_password",
    database: "ventas_db",
    synchronize: false, // Se mantiene false ya que las tablas fueron creadas previamente por SQL
    logging: true,
    entities: [Categoria, Producto, Venta, DetalleVenta],
    subscribers: [],
    migrations: [],
});
