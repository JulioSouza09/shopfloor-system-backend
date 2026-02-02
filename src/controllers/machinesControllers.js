let data = [];
let id_count = 1;

export const getAllMachines = (req, res) => {
    res.json(data);
};

export const createNewMachine = (req, res) => {
    const newMachine = {
        id: id_count++,
        ...req.body
    };
    data.push(newMachine);
    res.status(201).json(newMachine);
};

export const getMachine = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const machine = data.find(e => e.id === id);
    if (!machine) {
        return res.status(404).json({ error: "Machine not found." });
    }
    res.json(machine);
};

export const updateMachineStatus = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const pos = data.findIndex(e => e.id === id);
    if (pos === -1) {
        return res.status(404).json({ error: "Machine not found " });
    }
    data[pos].status = req.body.status;
    res.json(data[pos]);
};