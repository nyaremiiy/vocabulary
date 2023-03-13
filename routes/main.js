import { Router } from 'express';
const router = new Router();
import { main } from '../controllers/main.js';

// Main
router.get('/', main);

export default router;