"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const createForm = async (req, res) => {
    try {
        const { title, description, sections } = req.body;
        const userId = req.user.id;
        const form = await prisma_1.default.form.create({
            data: {
                title,
                description,
                token: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        console.error('Create form error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createForm = createForm;
//# sourceMappingURL=createForm.js.map