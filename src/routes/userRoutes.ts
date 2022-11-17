import express from 'express';
import { userController } from '../controllers/userController';
import type { Response, Request } from 'express';
import User from '../database/models/user'; 
import { validator } from '../middleware/validation';

const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
    await userController.getUsers(req, res);
})

router.post('/new', validator(User), async(req: Request, res: Response) => {
    await userController.createUser(req, res);
})

router.delete('/:id', async(req: Request, res: Response) => {
    await userController.deleteUser(req, res);
})

router.put('/:id', validator(User), async(req: Request, res: Response) => {
    await userController.updateUser(req, res);
})

export const userRoutes = router;