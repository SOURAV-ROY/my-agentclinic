import app from './app';
import { seedStore } from './models';

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

seedStore();

app.listen(PORT, () => {
  console.log(`AgentClinic listening on http://localhost:${PORT}`);
});

export default app;
