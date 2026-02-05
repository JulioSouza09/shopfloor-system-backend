import machinesService from '../services/machinesService.js';
import kpiService from '../services/kpiService.js';

export const getAllMachines = (req, res) => {
    try {
        res.json(machinesService.getAll());
    } catch (error) {
        console.error('Failed to get all machines: ', error);
        res.status(500).json({ error: "Failed to get all machines" })
    }
};

export const createNewMachine = (req, res) => {
    try {
        const newMachine = machinesService.createNew(req.body);
        res.status(201).json(newMachine);
        kpiService.invalidateCache();
    } catch (error) {
        console.error('Failed to add new machine: ', error);
        res.status(500).json({ error: "Failed to add new machine" })
    }
};

export const getMachine = (req, res) => {
    try {
        const machine = machinesService.get(req.params.id);
        if (!machine) {
            return res.status(404).json({ error: "Machine not found." });
        }
    } catch (error) {
        console.error('Failed to get machine: ', error);
        res.status(500).json({ error: "Failed to get machine" })
    }
    res.json(machine);
};

export const updateMachineStatus = (req, res) => {
    try {
        const machine = machinesService.updateStatus(req.params.id, req.body);
        if (!machine) {
            return res.status(404).json({ error: "Machine not found " });
        }
        kpiService.invalidateCache();
        res.json(machine);
    } catch (error) {
        console.error('Failed to update machine: ', error);
        res.status(500).json({ error: "Failed to update machine" })
    }
};