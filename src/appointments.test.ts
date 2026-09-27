import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './app';
import { resetStore } from './models';

beforeEach(() => resetStore());

async function seedBooking(): Promise<{ agentId: string; appointmentId: string }> {
  const agent = await request(app)
    .post('/agents')
    .set('Accept', 'application/json')
    .send({ name: 'Booky-1' });
  const agentId = agent.body.id as string;
  const booking = await request(app)
    .post('/appointments')
    .set('Accept', 'application/json')
    .send({ agentId, time: '2026-10-01T10:00:00Z' });
  expect(booking.status).toBe(201);
  return { agentId, appointmentId: booking.body.id as string };
}

describe('appointments', () => {
  it('books and lists appointments in staff view', async () => {
    await seedBooking();
    const list = await request(app).get('/appointments');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Booky-1');
    expect(list.text).toContain('2026-10-01T10:00:00Z');
  });

  it('rejects booking with bad agent or time', async () => {
    const badAgent = await request(app)
      .post('/appointments')
      .set('Accept', 'application/json')
      .send({ agentId: 'ag-999', time: '2026-10-01T10:00:00Z' });
    expect(badAgent.status).toBe(400);
    const { agentId } = await seedBooking();
    const badTime = await request(app)
      .post('/appointments')
      .set('Accept', 'application/json')
      .send({ agentId, time: 'not-a-time' });
    expect(badTime.status).toBe(400);
  });

  it('cancels and reschedules appointments', async () => {
    const { appointmentId } = await seedBooking();
    const reschedule = await request(app)
      .post(`/appointments/${appointmentId}/reschedule`)
      .set('Accept', 'application/json')
      .send({ time: '2026-10-02T11:00:00Z' });
    expect(reschedule.status).toBe(200);
    expect(reschedule.body.time).toBe('2026-10-02T11:00:00Z');
    const cancel = await request(app)
      .post(`/appointments/${appointmentId}/cancel`)
      .set('Accept', 'application/json')
      .send({});
    expect(cancel.status).toBe(200);
    expect(cancel.body.status).toBe('cancelled');
    const dashboard = await request(app).get('/dashboard');
    expect(dashboard.text).toContain('Upcoming appointments (0)');
  });

  it('shows upcoming appointments on the dashboard', async () => {
    await seedBooking();
    const dashboard = await request(app).get('/dashboard');
    expect(dashboard.text).toContain('Upcoming appointments (1)');
  });
});
