import { Router } from 'express';
const router = new Router();
import { login, registration } from './../controllers/auth.js';

// Реєстрація
router.post('/registration', registration);

// Авторизація
router.post('/login', login);

export default router;
