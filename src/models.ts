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
