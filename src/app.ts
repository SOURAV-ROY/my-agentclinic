import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { renderLayout } from './views/layout';
import { renderDashboard } from './views/dashboard';
import { renderAgentDetail, renderAgentList } from './views/agents';
import { renderAilmentDetail, renderAilmentList } from './views/ailments';
import { renderTherapyDetail, renderTherapyList } from './views/therapies';
import { renderAppointmentList } from './views/appointments';
import {
  findAgent,
  findAilment,
  findTherapy,
  findAppointment,
  nextId,
  store,
} from './models';
import type { Agent, Ailment, Appointment, Therapy } from './models';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function badRequest(res: Response, message: string): void {
  res.status(400).json({ error: message });
}

function notFound(res: Response, message: string): void {
  res.status(404).json({ error: message });
}

function wantsJson(req: Request): boolean {
  if (req.is('application/json')) return true;
  return (req.get('accept') ?? '').includes('application/json');
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function param(req: Request, name: string): string {
  const value: unknown = req.params[name];
  if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : '';
  return typeof value === 'string' ? value : '';
}

function page(res: Response, title: string, body: string): void {
  res.status(200).type('html').send(renderLayout({ title, body }));
}

function isValidTime(value: string): boolean {
  return value.length > 0 && !Number.isNaN(Date.parse(value));
}

app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).type('html').send(renderLayout());
});

app.get('/dashboard', (_req: Request, res: Response) => {
  page(res, 'Dashboard — AgentClinic', renderDashboard());
});

// ---- Agents (1.1–1.3) ----

app.get('/agents', (_req: Request, res: Response) => {
  page(res, 'Agents — AgentClinic', renderAgentList());
});

app.post('/agents', (req: Request, res: Response) => {
  const name = asText(req.body?.name);
  const model = asText(req.body?.model);
  if (!name) {
    badRequest(res, 'Agent name is required');
    return;
  }
  const agent: Agent = {
    id: nextId('ag'),
    name,
    model: model || undefined,
    createdAt: new Date().toISOString(),
  };
  store.agents.push(agent);
  if (wantsJson(req)) {
    res.status(201).json(agent);
    return;
  }
  res.redirect(302, `/agents/${agent.id}`);
});

app.get('/agents/:id', (req: Request, res: Response) => {
  const agent = findAgent(param(req, 'id'));
  if (!agent) {
    notFound(res, 'Agent not found');
    return;
  }
  const linked = store.ailments.filter((a) => a.agentId === agent.id);
  page(res, `${agent.name} — AgentClinic`, renderAgentDetail(agent, linked));
});

app.post('/agents/:id/edit', (req: Request, res: Response) => {
  const agent = findAgent(param(req, 'id'));
  if (!agent) {
    notFound(res, 'Agent not found');
    return;
  }
  const name = asText(req.body?.name);
  const model = asText(req.body?.model);
  if (!name) {
    badRequest(res, 'Agent name is required');
    return;
  }
  agent.name = name;
  agent.model = model || undefined;
  if (wantsJson(req)) {
    res.status(200).json(agent);
    return;
  }
  res.redirect(302, `/agents/${agent.id}`);
});

// ---- Ailments (2.1–2.3) ----

app.get('/ailments', (_req: Request, res: Response) => {
  page(res, 'Ailments — AgentClinic', renderAilmentList());
});

app.post('/ailments', (req: Request, res: Response) => {
  const name = asText(req.body?.name);
  const agentId = asText(req.body?.agentId);
  const notes = asText(req.body?.notes);
  if (!name) {
    badRequest(res, 'Ailment name is required');
    return;
  }
  if (!agentId || !findAgent(agentId)) {
    badRequest(res, 'Valid agentId is required');
    return;
  }
  const ailment: Ailment = {
    id: nextId('ai'),
    agentId,
    name,
    notes: notes || undefined,
    createdAt: new Date().toISOString(),
  };
  store.ailments.push(ailment);
  if (wantsJson(req)) {
    res.status(201).json(ailment);
    return;
  }
  res.redirect(302, `/ailments/${ailment.id}`);
});

app.get('/ailments/:id', (req: Request, res: Response) => {
  const ailment = findAilment(param(req, 'id'));
  if (!ailment) {
    notFound(res, 'Ailment not found');
    return;
  }
  page(res, `${ailment.name} — AgentClinic`, renderAilmentDetail(ailment, store.therapies));
});

app.post('/ailments/:id/edit', (req: Request, res: Response) => {
  const ailment = findAilment(param(req, 'id'));
  if (!ailment) {
    notFound(res, 'Ailment not found');
    return;
  }
  const name = asText(req.body?.name);
  const notes = asText(req.body?.notes);
  if (!name) {
    badRequest(res, 'Ailment name is required');
    return;
  }
  ailment.name = name;
  ailment.notes = notes || undefined;
  if (wantsJson(req)) {
    res.status(200).json(ailment);
    return;
  }
  res.redirect(302, `/ailments/${ailment.id}`);
});

app.post('/ailments/:id/assign', (req: Request, res: Response) => {
  const ailment = findAilment(param(req, 'id'));
  if (!ailment) {
    notFound(res, 'Ailment not found');
    return;
  }
  const therapyId = asText(req.body?.therapyId);
  if (!therapyId || !findTherapy(therapyId)) {
    badRequest(res, 'Valid therapyId is required');
    return;
  }
  ailment.therapyId = therapyId;
  if (wantsJson(req)) {
    res.status(200).json(ailment);
    return;
  }
  res.redirect(302, `/ailments/${ailment.id}`);
});

// ---- Therapies (2.4–2.6) ----

app.get('/therapies', (_req: Request, res: Response) => {
  page(res, 'Therapies — AgentClinic', renderTherapyList());
});

app.post('/therapies', (req: Request, res: Response) => {
  const name = asText(req.body?.name);
  const description = asText(req.body?.description);
  if (!name) {
    badRequest(res, 'Therapy name is required');
    return;
  }
  const therapy: Therapy = {
    id: nextId('th'),
    name,
    description: description || undefined,
    createdAt: new Date().toISOString(),
  };
  store.therapies.push(therapy);
  if (wantsJson(req)) {
    res.status(201).json(therapy);
    return;
  }
  res.redirect(302, `/therapies/${therapy.id}`);
});

app.get('/therapies/:id', (req: Request, res: Response) => {
  const therapy = findTherapy(param(req, 'id'));
  if (!therapy) {
    notFound(res, 'Therapy not found');
    return;
  }
  page(res, `${therapy.name} — AgentClinic`, renderTherapyDetail(therapy));
});

app.post('/therapies/:id/edit', (req: Request, res: Response) => {
  const therapy = findTherapy(param(req, 'id'));
  if (!therapy) {
    notFound(res, 'Therapy not found');
    return;
  }
  const name = asText(req.body?.name);
  const description = asText(req.body?.description);
  if (!name) {
    badRequest(res, 'Therapy name is required');
    return;
  }
  therapy.name = name;
  therapy.description = description || undefined;
  if (wantsJson(req)) {
    res.status(200).json(therapy);
    return;
  }
  res.redirect(302, `/therapies/${therapy.id}`);
});

// ---- Appointments (2.7–2.9) ----

app.get('/appointments', (_req: Request, res: Response) => {
  page(res, 'Appointments — AgentClinic', renderAppointmentList());
});

app.post('/appointments', (req: Request, res: Response) => {
  const agentId = asText(req.body?.agentId);
  const ailmentId = asText(req.body?.ailmentId);
  const therapyId = asText(req.body?.therapyId);
  const time = asText(req.body?.time);
  if (!agentId || !findAgent(agentId)) {
    badRequest(res, 'Valid agentId is required');
    return;
  }
  if (ailmentId) {
    const ailment = findAilment(ailmentId);
    if (!ailment) {
      badRequest(res, 'Valid ailmentId is required');
      return;
    }
    if (ailment.agentId !== agentId) {
      badRequest(res, 'Ailment does not belong to this agent');
      return;
    }
  }
  if (therapyId && !findTherapy(therapyId)) {
    badRequest(res, 'Valid therapyId is required');
    return;
  }
  if (!isValidTime(time)) {
    badRequest(res, 'Valid time is required');
    return;
  }
  const appointment: Appointment = {
    id: nextId('ap'),
    agentId,
    ailmentId: ailmentId || undefined,
    therapyId: therapyId || undefined,
    time,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };
  store.appointments.push(appointment);
  if (wantsJson(req)) {
    res.status(201).json(appointment);
    return;
  }
  res.redirect(302, '/appointments');
});

app.post('/appointments/:id/cancel', (req: Request, res: Response) => {
  const appointment = findAppointment(param(req, 'id'));
  if (!appointment) {
    notFound(res, 'Appointment not found');
    return;
  }
  if (appointment.status !== 'scheduled') {
    badRequest(res, 'Only scheduled appointments can be cancelled');
    return;
  }
  appointment.status = 'cancelled';
  if (wantsJson(req)) {
    res.status(200).json(appointment);
    return;
  }
  res.redirect(302, '/appointments');
});

app.post('/appointments/:id/reschedule', (req: Request, res: Response) => {
  const appointment = findAppointment(param(req, 'id'));
  if (!appointment) {
    notFound(res, 'Appointment not found');
    return;
  }
  if (appointment.status !== 'scheduled') {
    badRequest(res, 'Only scheduled appointments can be rescheduled');
    return;
  }
  const time = asText(req.body?.time);
  if (!isValidTime(time)) {
    badRequest(res, 'Valid time is required');
    return;
  }
  appointment.time = time;
  if (wantsJson(req)) {
    res.status(200).json(appointment);
    return;
  }
  res.redirect(302, '/appointments');
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
