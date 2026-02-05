import express from 'express'
import { getValidator, validateId } from '../middlewares/globalMiddlewares.js'
import { machineStatusSchema } from '../validators/machineValidator.js';
import * as machinesController from '../controllers/machinesControllers.js'
import machineSchema from '../validators/machineValidator.js'

const app = express.Router();

app.get('/', machinesController.getAllMachines);
app.post('/', getValidator(machineSchema), machinesController.createNewMachine);
app.get('/:id', validateId, machinesController.getMachine);
app.patch('/:id', validateId, getValidator(machineStatusSchema), machinesController.updateMachineStatus);
app.delete('/:id', validateId, getValidator(machineSchema), machinesController.removeMachine);

export default app;