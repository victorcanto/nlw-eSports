import express from 'express';
import cors from 'cors';
import AppRoutes from './routes';

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use(AppRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
