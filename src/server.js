import { app } from './app.js'
import ordersRoutes from './routes/ordersRoutes.js'

app.use('/api', ordersRoutes);
app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});