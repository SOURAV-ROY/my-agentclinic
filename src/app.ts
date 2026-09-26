import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { renderLayout } from './views/layout';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).type('html').send(renderLayout());
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
