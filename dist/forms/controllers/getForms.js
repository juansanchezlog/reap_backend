"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForms = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const getForms = async (req, res) => {
    try {
        const userId = req.user.id;
        const forms = await prisma_1.default.form.findMany({
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
    }
    catch (error) {
        console.error('Get forms error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getForms = getForms;
//# sourceMappingURL=getForms.js.map