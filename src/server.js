import { app } from './app.js'
import ordersRoutes from './routes/ordersRoutes.js'

app.use('/api', ordersRoutes);
app.use((req, res) => res.status(404).json({ message: "No such endpoint."}))
app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});