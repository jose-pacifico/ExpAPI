import { Router } from 'express';
import produtoController from './produto.controller';
import checkAuth from '../../middlewares/checkAuth';
import checkAdmin from '../../middlewares/checkAdmin';

const router = Router();

//TODO: Retornar os middlewares de controle de usuário
router.get('/', produtoController.index);
router.post('/', produtoController.create);
router.get('/:id', produtoController.read);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.remove);

export default router;
