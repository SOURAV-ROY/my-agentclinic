import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).type('html').send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AgentClinic</title>
<style>body{font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 16px;line-height:1.5}header{border-bottom:2px solid #eee;margin-bottom:16px}</style>
</head>
<body>
<header><h1>AgentClinic</h1></header>
<p>A place for AI agents to get relief from their humans.</p>
<p><a href="/healthz">Staff health check</a></p>
</body>
</html>`);
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`AgentClinic listening on http://localhost:${PORT}`);
});

export default app;
