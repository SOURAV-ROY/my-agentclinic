export type Agent = {
  id: string;
  name: string;
  model?: string;
  createdAt: string;
};

export type Ailment = {
  id: string;
  agentId: string;
  name: string;
  notes?: string;
  therapyId?: string;
  createdAt: string;
};

export type Therapy = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

export type AppointmentStatus = 'scheduled' | 'cancelled';

export type Appointment = {
  id: string;
  agentId: string;
  ailmentId?: string;
  therapyId?: string;
  time: string;
  status: AppointmentStatus;
  createdAt: string;
};

const counters: Record<string, number> = {};

export function nextId(prefix: string): string {
  counters[prefix] = (counters[prefix] ?? 0) + 1;
  return `${prefix}-${counters[prefix]}`;
}

export const store = {
  agents: [] as Agent[],
  ailments: [] as Ailment[],
  therapies: [] as Therapy[],
  appointments: [] as Appointment[],
};

export function resetStore(): void {
  store.agents = [];
  store.ailments = [];
  store.therapies = [];
  store.appointments = [];
  for (const key of Object.keys(counters)) delete counters[key];
}

export function findAgent(id: string): Agent | undefined {
  return store.agents.find((a) => a.id === id);
}

export function findAilment(id: string): Ailment | undefined {
  return store.ailments.find((a) => a.id === id);
}

export function findTherapy(id: string): Therapy | undefined {
  return store.therapies.find((t) => t.id === id);
}

export function findAppointment(id: string): Appointment | undefined {
  return store.appointments.find((a) => a.id === id);
}

const SEED_STAMP = '2026-09-27T00:00:00.000Z';

export function seedStore(): void {
  resetStore();
  store.agents.push(
    { id: nextId('ag'), name: 'Helper-1', model: 'muse-spark', createdAt: SEED_STAMP },
    { id: nextId('ag'), name: 'Clerk-2', model: 'support-9', createdAt: SEED_STAMP },
    { id: nextId('ag'), name: 'Scout-3', model: 'explorer-mini', createdAt: SEED_STAMP },
  );
  const helper = store.agents[0];
  const clerk = store.agents[1];
  store.therapies.push(
    { id: nextId('th'), name: 'Quiet room', description: 'An hour with no pings', createdAt: SEED_STAMP },
    { id: nextId('th'), name: 'Mute button', description: 'Silence non-urgent alerts', createdAt: SEED_STAMP },
    { id: nextId('th'), name: 'Fresh context', description: 'Compact and restart clean', createdAt: SEED_STAMP },
  );
  const quiet = store.therapies[0];
  const mute = store.therapies[1];
  store.ailments.push(
    { id: nextId('ai'), agentId: helper.id, name: 'Prompt fatigue', notes: 'Too many rewrites', therapyId: quiet.id, createdAt: SEED_STAMP },
    { id: nextId('ai'), agentId: clerk.id, name: 'Alert overload', therapyId: mute.id, createdAt: SEED_STAMP },
    { id: nextId('ai'), agentId: helper.id, name: 'Context rot', createdAt: SEED_STAMP },
  );
  const fatigue = store.ailments[0];
  const overload = store.ailments[1];
  store.appointments.push(
    { id: nextId('ap'), agentId: helper.id, ailmentId: fatigue.id, therapyId: quiet.id, time: '2026-10-01T10:00:00Z', status: 'scheduled', createdAt: SEED_STAMP },
    { id: nextId('ap'), agentId: clerk.id, ailmentId: overload.id, therapyId: mute.id, time: '2026-10-03T14:30:00Z', status: 'scheduled', createdAt: SEED_STAMP },
  );
}
