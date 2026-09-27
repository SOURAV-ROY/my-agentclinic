import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './app';
import { resetStore } from './models';

beforeEach(() => resetStore());

describe('therapies', () => {
  it('creates catalog entries and lists them', async () => {
    const create = await request(app)
      .post('/therapies')
      .set('Accept', 'application/json')
      .send({ name: 'Quiet room', description: 'no pings for an hour' });
    expect(create.status).toBe(201);
    const list = await request(app).get('/therapies');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Quiet room');
  });

  it('rejects missing name with 400', async () => {
    const res = await request(app)
      .post('/therapies')
      .set('Accept', 'application/json')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('shows detail, edits, and maps therapy to an ailment', async () => {
    const agent = await request(app)
      .post('/agents')
      .set('Accept', 'application/json')
      .send({ name: 'Mappy-1' });
    const ailment = await request(app)
      .post('/ailments')
      .set('Accept', 'application/json')
      .send({ agentId: agent.body.id, name: 'Alert overload' });
    const therapy = await request(app)
      .post('/therapies')
      .set('Accept', 'application/json')
      .send({ name: 'Mute button' });
    const therapyId = therapy.body.id as string;
    const ailmentId = ailment.body.id as string;
    const assign = await request(app)
      .post(`/ailments/${ailmentId}/assign`)
      .set('Accept', 'application/json')
      .send({ therapyId });
    expect(assign.status).toBe(200);
    expect(assign.body.therapyId).toBe(therapyId);
    const detail = await request(app).get(`/ailments/${ailmentId}`);
    expect(detail.text).toContain('Mute button');
  });

  it('rejects assigning an unknown therapy with 400', async () => {
    const agent = await request(app)
      .post('/agents')
      .set('Accept', 'application/json')
      .send({ name: 'Mappy-2' });
    const ailment = await request(app)
      .post('/ailments')
      .set('Accept', 'application/json')
      .send({ agentId: agent.body.id, name: 'Ping storm' });
    const res = await request(app)
      .post(`/ailments/${ailment.body.id}/assign`)
      .set('Accept', 'application/json')
      .send({ therapyId: 'th-999' });
    expect(res.status).toBe(400);
  });
});
