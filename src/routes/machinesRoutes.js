import express from 'express'
import { getValidator } from '../middlewares/globalMiddlewares.js'
import { machineStatusSchema } from '../validators/machineValidator.js';
import * as machinesController from '../controllers/machinesControllers.js'
import machineSchema from '../validators/machineValidator.js'

const app = express.Router();

app.get('/', machinesController.getAllMachines);
app.post('/', getValidator(machineSchema), machinesController.createNewMachine);
app.get('/:id', machinesController.getMachine);
app.patch('/:id', getValidator(machineStatusSchema), machinesController.updateMachineStatus);

export default app;