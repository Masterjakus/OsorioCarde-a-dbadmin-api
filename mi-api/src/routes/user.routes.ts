import { Router } from "express";
import { getUsers, getUsersById } from "../controllers/user.controller.js";
import { createProducto } from "../controllers/producto.controller.js";

const router = Router();

router.get('/user', getUsers);
router.get('/userGetId/:id', getUsersById);
router.post('/producto', createProducto);


export default router;