import { Router } from 'express';
import produtoController from './produto.controller';
import checkAuth from '../../middlewares/checkAuth';
import checkAdmin from '../../middlewares/checkAdmin';

const router = Router();

router.get('/', checkAuth, produtoController.index);
router.post('/', checkAuth, checkAdmin, produtoController.create);
router.get('/:id', checkAuth, produtoController.read);
router.put('/:id', checkAuth, checkAdmin, produtoController.update);
router.delete('/:id', checkAuth, checkAdmin, produtoController.remove);

export default router;
