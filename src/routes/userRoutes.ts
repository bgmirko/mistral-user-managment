import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.get('/users', async(req, res) => {
    await UserController.getUsers(req, res);
})

router.post('/users/new', async(req, res) => {
    await UserController.createUser(req, res);
})

router.delete('/users/delete/:id', async(req, res) => {
    await UserController.deleteUser(req, res);
})

router.put('/users/update/:id', async(req, res) => {
    await UserController.updateUser(req, res);
})

export const userRoutes = router;