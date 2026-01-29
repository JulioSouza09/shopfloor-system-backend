import { app } from './app.js'

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});