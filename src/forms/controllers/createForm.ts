import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CreateFormData } from '../../types';
import prisma from '../../prisma/prisma';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const createForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, sections }: CreateFormData = req.body;
    const userId = req.user!.id;

    const form = await prisma.form.create({
      data: {
        title,
        description,
        token: uuidv4(),
        userId,
        sections: {
          create: sections.map(section => ({
            title: section.title,
            description: section.description,
            order: section.order,
            fields: {
              create: section.fields.map(field => ({
                label: field.label,
                type: field.type,
                required: field.required,
                order: field.order
              }))
            }
          }))
        }
      },
      include: {
        sections: {
          include: {
            fields: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    res.status(201).json({
      data: {
        id: form.id,
        title: form.title,
        token: form.token
      }
    });
  } catch (error) {
    console.error('Create form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
