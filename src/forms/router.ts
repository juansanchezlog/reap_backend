import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { createForm } from './controllers/createForm';
import { getForms } from './controllers/getForms';
import { getFormByToken } from './controllers/getFormByToken';
import { submitForm } from './controllers/submit';

const router = Router();

router.post('/', authenticateToken, createForm);
router.get('/', authenticateToken, getForms);

router.get('/public/:token', getFormByToken);
router.post('/public/:token/submit', submitForm);

export default router;
