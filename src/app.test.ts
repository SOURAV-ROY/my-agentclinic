import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('AgentClinic app', () => {
  it('GET /healthz returns 200 JSON', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET / returns 200 HTML with layout + CSS link', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<header>');
    expect(res.text).toContain('<main>');
    expect(res.text).toContain('<footer>');
    expect(res.text).toContain('AgentClinic');
    expect(res.text).toContain('/styles.css');
  });

  it('unknown route returns 404', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
  });
});
