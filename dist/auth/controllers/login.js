"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const login = async (req, res) => {
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
        let user = await prisma_1.default.user.findUnique({
            where: { username: "admin" }
        });
        if (!user) {
            const hashedPassword = await bcryptjs_1.default.hash("admin", 10);
            user = await prisma_1.default.user.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    username: "admin",
                    password: hashedPassword
                }
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map