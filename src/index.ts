import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './auth/router';
import formRouter from './forms/router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/forms', formRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
