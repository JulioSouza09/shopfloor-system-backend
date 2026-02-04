import { app } from './app.js'
import ordersRoutes from './routes/ordersRoutes.js'
import machinesRoutes from './routes/machinesRoutes.js'
import kpisRoutes from './routes/kpisRoutes.js'

app.use('/api/orders', ordersRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/kpis', kpisRoutes);
app.use((req, res) => res.status(404).json({ error: "No such endpoint."}))
app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});