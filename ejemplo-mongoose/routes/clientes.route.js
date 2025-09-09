import { Router } from 'express';
import { 
  getClientesHandler,
  postClienteHandler,
} from '../controllers/clientes.controller.js';

import { 
  verifyTokenHandler
} from '../controllers/auth.controller.js';

const router = Router();
router.get('/', verifyTokenHandler(), getClientesHandler);
router.post('/', verifyTokenHandler() ,postClienteHandler);

export default router;
