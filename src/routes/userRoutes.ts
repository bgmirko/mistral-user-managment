import express from 'express';
import { userController } from '../controllers/userController';
import type { Response, Request } from 'express';

const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
    await userController.getUsers(req, res);
})

router.post('/new', async(req: Request, res: Response) => {
    await userController.createUser(req, res);
})

router.delete('/:id', async(req: Request, res: Response) => {
    await userController.deleteUser(req, res);
})

router.put('/:id', async(req: Request, res: Response) => {
    await userController.updateUser(req, res);
})

export const userRoutes = router;