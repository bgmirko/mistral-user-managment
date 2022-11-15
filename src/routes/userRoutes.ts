import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.get('/users', async(req, res) => {
    await userController.getUsers(req, res);
})

router.post('/users/new', async(req, res) => {
    await userController.createUser(req, res);
})

router.delete('/users/delete/:id', async(req, res) => {
    await userController.deleteUser(req, res);
})

router.put('/users/update/:id', async(req, res) => {
    await userController.updateUser(req, res);
})

export const userRoutes = router;