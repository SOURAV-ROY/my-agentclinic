import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './app';
import { resetStore } from './models';

beforeEach(() => resetStore());

async function createAgent(name = 'Helper-1', model = 'muse-spark'): Promise<string> {
  const res = await request(app)
    .post('/agents')
    .set('Accept', 'application/json')
    .send({ name, model });
  expect(res.status).toBe(201);
  return res.body.id as string;
}

describe('agents', () => {
  it('creates and lists agents', async () => {
    await createAgent();
    const list = await request(app).get('/agents');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Helper-1');
    expect(list.text).toContain('Onboard agent');
  });

  it('rejects missing name with 400', async () => {
    const res = await request(app)
      .post('/agents')
      .set('Accept', 'application/json')
      .send({ name: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('shows detail and edits agent', async () => {
    const id = await createAgent('Detail-1');
    const detail = await request(app).get(`/agents/${id}`);
    expect(detail.status).toBe(200);
    expect(detail.text).toContain('Detail-1');
    const edit = await request(app)
      .post(`/agents/${id}/edit`)
      .set('Accept', 'application/json')
      .send({ name: 'Detail-2', model: 'spark' });
    expect(edit.status).toBe(200);
    expect(edit.body.name).toBe('Detail-2');
  });

  it('returns 404 JSON for unknown agent', async () => {
    const res = await request(app).get('/agents/ag-999');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});
