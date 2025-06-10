import { Request, Response } from 'express';
import prisma from '../../prisma/prisma';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const getForms = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const forms = await prisma.form.findMany({
      where: { userId },
      include: {
        sections: {
          include: {
            fields: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Map the _count.submissions to responseCount for frontend compatibility
    const formsWithResponseCount = forms.map(form => ({
      ...form,
      responseCount: form._count.submissions,
      _count: undefined // Remove the _count field
    }));

    res.json(formsWithResponseCount);
  } catch (error) {
    console.error('Get forms error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
