import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './app';
import { resetStore } from './models';

beforeEach(() => resetStore());

describe('dashboard shell', () => {
  it('GET /dashboard renders widgets and entry links', async () => {
    const res = await request(app).get('/dashboard');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Dashboard');
    expect(res.text).toContain('Agents (0)');
    expect(res.text).toContain('Ailments (0)');
    expect(res.text).toContain('Therapies (0)');
    expect(res.text).toContain('Upcoming appointments (0)');
    expect(res.text).toContain('/agents');
  });

  it('dashboard reflects created agents and upcoming appointments', async () => {
    const agent = await request(app)
      .post('/agents')
      .set('Accept', 'application/json')
      .send({ name: 'Dash-1' });
    await request(app)
      .post('/appointments')
      .set('Accept', 'application/json')
      .send({ agentId: agent.body.id, time: '2026-10-01T10:00:00Z' });
    const res = await request(app).get('/dashboard');
    expect(res.text).toContain('Agents (1)');
    expect(res.text).toContain('Dash-1');
    expect(res.text).toContain('Upcoming appointments (1)');
  });
});
