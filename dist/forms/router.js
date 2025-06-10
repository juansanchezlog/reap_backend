"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const createForm_1 = require("./controllers/createForm");
const getForms_1 = require("./controllers/getForms");
const getFormByToken_1 = require("./controllers/getFormByToken");
const submit_1 = require("./controllers/submit");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, createForm_1.createForm);
router.get('/', auth_1.authenticateToken, getForms_1.getForms);
router.get('/public/:token', getFormByToken_1.getFormByToken);
router.post('/public/:token/submit', submit_1.submitForm);
exports.default = router;
//# sourceMappingURL=router.js.map