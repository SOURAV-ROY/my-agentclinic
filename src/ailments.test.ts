import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './app';
import { resetStore } from './models';

beforeEach(() => resetStore());

async function createAgent(): Promise<string> {
  const res = await request(app)
    .post('/agents')
    .set('Accept', 'application/json')
    .send({ name: 'Achy-1' });
  return res.body.id as string;
}

describe('ailments', () => {
  it('records and lists ailments linked to an agent', async () => {
    const agentId = await createAgent();
    const create = await request(app)
      .post('/ailments')
      .set('Accept', 'application/json')
      .send({ agentId, name: 'Prompt fatigue', notes: 'too many rewrites' });
    expect(create.status).toBe(201);
    const list = await request(app).get('/ailments');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Prompt fatigue');
    expect(list.text).toContain('Achy-1');
  });

  it('rejects unknown agentId with 400', async () => {
    const res = await request(app)
      .post('/ailments')
      .set('Accept', 'application/json')
      .send({ agentId: 'ag-999', name: 'X' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/agent/i);
  });

  it('shows detail and edits ailment', async () => {
    const agentId = await createAgent();
    const create = await request(app)
      .post('/ailments')
      .set('Accept', 'application/json')
      .send({ agentId, name: 'Context rot' });
    const id = create.body.id as string;
    const detail = await request(app).get(`/ailments/${id}`);
    expect(detail.status).toBe(200);
    expect(detail.text).toContain('Context rot');
    const edit = await request(app)
      .post(`/ailments/${id}/edit`)
      .set('Accept', 'application/json')
      .send({ name: 'Context rot v2', notes: 'worse' });
    expect(edit.status).toBe(200);
    expect(edit.body.name).toBe('Context rot v2');
  });

  it('returns 404 JSON for unknown ailment', async () => {
    const res = await request(app).get('/ailments/ai-999');
    expect(res.status).toBe(404);
  });
});
