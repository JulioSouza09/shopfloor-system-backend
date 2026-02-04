import express from 'express'

const router = express.Router();

router.get('/', kpisController);

export default router;