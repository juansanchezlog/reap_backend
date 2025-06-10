"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormByToken = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const getFormByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const form = await prisma_1.default.form.findUnique({
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
    }
    catch (error) {
        console.error('Get form by token error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFormByToken = getFormByToken;
//# sourceMappingURL=getFormByToken.js.map