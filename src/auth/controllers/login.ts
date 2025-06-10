import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import prisma from '../../prisma/prisma';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password required' });
      return;
    }

    if (username !== "admin" || password !== "admin") {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    let user = await prisma.user.findUnique({
      where: { username: "admin" }
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      user = await prisma.user.create({
        data: {
          id: uuidv4(),
          username: "admin",
          password: hashedPassword
        }
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 