import express from 'express'
import { getKPIs } from '../controllers/kpisControllers.js'

const router = express.Router();

router.get('/', getKPIs);

export default router;