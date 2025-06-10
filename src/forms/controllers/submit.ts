import { Request, Response } from 'express';
import { FormSubmissionData } from '../../types';
import prisma from '../../prisma/prisma';

export const submitForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const { responses }: FormSubmissionData = req.body;

    const form = await prisma.form.findUnique({
      where: { token },
      include: {
        sections: {
          include: {
            fields: true
          }
        }
      }
    });

    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }

    const allFields = form.sections.flatMap(section => section.fields);
    const requiredFields = allFields.filter(field => field.required);
    const submittedFieldIds = responses.map(r => r.fieldId);

    for (const requiredField of requiredFields) {
      if (!submittedFieldIds.includes(requiredField.id)) {
        res.status(400).json({ 
          error: `Required field "${requiredField.label}" is missing` 
        });
        return;
      }
    }

    for (const response of responses) {
      const field = allFields.find(f => f.id === response.fieldId);
      if (!field) {
        res.status(400).json({ 
          error: `Invalid field ID: ${response.fieldId}` 
        });
        return;
      }

      if (field.type === 'NUMBER' && isNaN(Number(response.value))) {
        res.status(400).json({ 
          error: `Field "${field.label}" must be a number` 
        });
        return;
      }
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formId: form.id,
        responses: {
          create: responses.map(response => ({
            fieldId: response.fieldId,
            value: response.value
          }))
        }
      },
      include: {
        responses: {
          include: {
            field: true
          }
        }
      }
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission.id 
    });
  } catch (error) {
    console.error('Submit form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 