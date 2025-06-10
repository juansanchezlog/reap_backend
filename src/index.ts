import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './auth/router';
import formRouter from './forms/router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting server...');

app.use(cors({
  origin: [
    'https://reapform.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/forms', formRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Server URL: ${process.env.NODE_ENV === 'production' ? 'https://reap-backend.onrender.com' : `http://localhost:${PORT}`}`);
});
