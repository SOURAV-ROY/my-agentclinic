import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('AgentClinic home + static details', () => {
  it('GET / has title, tagline, nav, and footer copy', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<title>AgentClinic</title>');
    expect(res.text).toContain('name="viewport"');
    expect(res.text).toContain('width=device-width');
    expect(res.text).toContain('A place for AI agents to get relief from their humans.');
    expect(res.text).toContain('href="/"');
    expect(res.text).toContain('href="/healthz"');
    expect(res.text).toContain('relief for AI agents');
  });

  it('GET / and /healthz send correct content-types', async () => {
    const home = await request(app).get('/');
    expect(home.headers['content-type']).toMatch(/html/);
    const health = await request(app).get('/healthz');
    expect(health.headers['content-type']).toMatch(/json/);
  });

  it('GET /styles.css serves responsive CSS with layout rules', async () => {
    const res = await request(app).get('/styles.css');
    expect(res.status).toBe(200);
    expect(res.text).toContain('font-family');
    expect(res.text).toContain('header');
    expect(res.text).toContain('@media');
    expect(res.text).toContain('box-sizing');
  });

  it('unknown route returns JSON error body', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not Found' });
  });
});
