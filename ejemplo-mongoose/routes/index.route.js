import { Router } from 'express';
import clientsRoute from './clientes.route.js';
import authRoute from './auth.route.js';

const router = Router();

router.use("/clientes", clientsRoute);
router.use("/auth", authRoute);

export default router;
