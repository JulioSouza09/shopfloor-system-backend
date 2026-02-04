import kpiService from '../services/kpiService.js';

export const getKPIs = (req, res) => {
    try {
        const kpis = kpiService.getKPIs();
        res.json(kpis);
    } catch (error) {
        console.error('Failed to get all KPIs: ', error);
        res.status(500).json({ error: "Failed to get all KPIs" });
    }
};