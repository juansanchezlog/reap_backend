"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const submitForm = async (req, res) => {
    try {
        const { token } = req.params;
        const { responses } = req.body;
        const form = await prisma_1.default.form.findUnique({
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
        const submission = await prisma_1.default.formSubmission.create({
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
    }
    catch (error) {
        console.error('Submit form error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.submitForm = submitForm;
//# sourceMappingURL=submit.js.map