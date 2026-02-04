import ordersService from './ordersService.js'
import machinesService from './machinesService.js'

class KPIService {
    #cache = null;
    #lastUpdated = null;
    constructor(timeToLive, services) {
        this.timeToLive = timeToLive
        this.services = services;
    }

    isValidCache() {
        return this.#cache && (Date.now() - this.#lastUpdated < this.timeToLive);
    }

    invalidateCache() {
        this.#cache = null;
        this.#lastUpdated = null;
    }

    getKPIs() {
        if (this.isValidCache()) {
            return this.#cache;
        }

        const kpis = {};
        for (const service of this.services) {
            Object.assign(kpis, service.getKPI());
        }
        this.#lastUpdated = Date.now();
        this.#cache = kpis;
        return this.#cache;
    }
};

export default new KPIService(30000, [ordersService, machinesService]);