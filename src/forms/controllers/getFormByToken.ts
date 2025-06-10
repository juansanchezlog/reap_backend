import { Request, Response } from 'express';
import prisma from '../../prisma/prisma';

export const getFormByToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const form = await prisma.form.findUnique({
      where: { token },
      include: {
        sections: {
          include: {
            fields: {
              orderBy: {
                order: 'asc'
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }

    res.json(form);
  } catch (error) {
    console.error('Get form by token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
