import machinesService from "../services/machinesService.js";

export const getAllMachines = (req, res) => {
    res.json(machinesService.getAll());
};

export const createNewMachine = (req, res) => {
    const newMachine = machinesService.createNew(req.body);
    res.status(201).json(newMachine);
};

export const getMachine = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const machine = machinesService.get(id);
    if (!machine) {
        return res.status(404).json({ error: "Machine not found." });
    }
    res.json(machine);
};

export const updateMachineStatus = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const machine = machinesService.updateStatus(id, req.body);
    if (!machine) {
        return res.status(404).json({ error: "Machine not found " });
    }
    res.json(machine);
};