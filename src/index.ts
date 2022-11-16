import "reflect-metadata";
import express from "express";
import { sequelize } from "./database/models";
import { userRoutes } from './routes/userRoutes';

const PORT = process.env.PORT ?? 3000;

var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello from Mistral User Management</h1>")
})

app.use("/users", userRoutes);

//Error handler must be last app.use!!
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Something broke! Please contact support.'
    })
})

app.listen(PORT, () => {
    sequelize.sync().then(() => {
        console.log(`App running on port ${PORT}`)
    });
})