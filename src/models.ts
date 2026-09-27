import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { applyMigrations, defaultMigrationsDir } from './migrate';

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

const dbPath =
  process.env.AGENTCLINIC_DB ?? (process.env.VITEST ? ':memory:' : path.join('data', 'agentclinic.db'));

if (!dbPath.includes(':memory:')) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new DatabaseSync(dbPath);

applyMigrations(db, defaultMigrationsDir());

type Row = Record<string, string | number | bigint | Uint8Array | null>;

function toAgent(r: Row): Agent {
  return {
    id: String(r.id),
    name: String(r.name),
    model: r.model == null ? undefined : String(r.model),
    createdAt: String(r.createdAt),
  };
}

function toAilment(r: Row): Ailment {
  return {
    id: String(r.id),
    agentId: String(r.agentId),
    name: String(r.name),
    notes: r.notes == null ? undefined : String(r.notes),
    therapyId: r.therapyId == null ? undefined : String(r.therapyId),
    createdAt: String(r.createdAt),
  };
}

function toTherapy(r: Row): Therapy {
  return {
    id: String(r.id),
    name: String(r.name),
    description: r.description == null ? undefined : String(r.description),
    createdAt: String(r.createdAt),
  };
}

function toAppointment(r: Row): Appointment {
  return {
    id: String(r.id),
    agentId: String(r.agentId),
    ailmentId: r.ailmentId == null ? undefined : String(r.ailmentId),
    therapyId: r.therapyId == null ? undefined : String(r.therapyId),
    time: String(r.time),
    status: String(r.status) === 'cancelled' ? 'cancelled' : 'scheduled',
    createdAt: String(r.createdAt),
  };
}

export const store = {
  agents: [] as Agent[],
  ailments: [] as Ailment[],
  therapies: [] as Therapy[],
  appointments: [] as Appointment[],
};

function syncCounters(): void {
  const pick = (prefix: string, ids: string[]): number => {
    let max = 0;
    for (const id of ids) {
      const m = new RegExp(`^${prefix}-(\\d+)$`).exec(id);
      if (m) max = Math.max(max, Number(m[1]));
    }
    return max;
  };
  counters.ag = pick('ag', store.agents.map((a) => a.id));
  counters.ai = pick('ai', store.ailments.map((a) => a.id));
  counters.th = pick('th', store.therapies.map((t) => t.id));
  counters.ap = pick('ap', store.appointments.map((a) => a.id));
}

function loadAll(): void {
  store.agents = db.prepare('SELECT * FROM agents').all().map(toAgent);
  store.ailments = db.prepare('SELECT * FROM ailments').all().map(toAilment);
  store.therapies = db.prepare('SELECT * FROM therapies').all().map(toTherapy);
  store.appointments = db.prepare('SELECT * FROM appointments').all().map(toAppointment);
  syncCounters();
}

loadAll();

export function resetStore(): void {
  db.exec('DELETE FROM appointments; DELETE FROM ailments; DELETE FROM therapies; DELETE FROM agents;');
  store.agents = [];
  store.ailments = [];
  store.therapies = [];
  store.appointments = [];
  for (const key of Object.keys(counters)) delete counters[key];
}

export function insertAgent(a: Agent): void {
  store.agents.push(a);
  db.prepare('INSERT INTO agents (id, name, model, createdAt) VALUES (?, ?, ?, ?)').run(
    a.id,
    a.name,
    a.model ?? null,
    a.createdAt,
  );
}

export function persistAgent(a: Agent): void {
  db.prepare('INSERT OR REPLACE INTO agents (id, name, model, createdAt) VALUES (?, ?, ?, ?)').run(
    a.id,
    a.name,
    a.model ?? null,
    a.createdAt,
  );
}

export function insertAilment(a: Ailment): void {
  store.ailments.push(a);
  db.prepare(
    'INSERT INTO ailments (id, agentId, name, notes, therapyId, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
  ).run(a.id, a.agentId, a.name, a.notes ?? null, a.therapyId ?? null, a.createdAt);
}

export function persistAilment(a: Ailment): void {
  db.prepare(
    'INSERT OR REPLACE INTO ailments (id, agentId, name, notes, therapyId, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
  ).run(a.id, a.agentId, a.name, a.notes ?? null, a.therapyId ?? null, a.createdAt);
}

export function insertTherapy(t: Therapy): void {
  store.therapies.push(t);
  db.prepare('INSERT INTO therapies (id, name, description, createdAt) VALUES (?, ?, ?, ?)').run(
    t.id,
    t.name,
    t.description ?? null,
    t.createdAt,
  );
}

export function persistTherapy(t: Therapy): void {
  db.prepare(
    'INSERT OR REPLACE INTO therapies (id, name, description, createdAt) VALUES (?, ?, ?, ?)',
  ).run(t.id, t.name, t.description ?? null, t.createdAt);
}

export function insertAppointment(a: Appointment): void {
  store.appointments.push(a);
  db.prepare(
    'INSERT INTO appointments (id, agentId, ailmentId, therapyId, time, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(a.id, a.agentId, a.ailmentId ?? null, a.therapyId ?? null, a.time, a.status, a.createdAt);
}

export function persistAppointment(a: Appointment): void {
  db.prepare(
    'INSERT OR REPLACE INTO appointments (id, agentId, ailmentId, therapyId, time, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(a.id, a.agentId, a.ailmentId ?? null, a.therapyId ?? null, a.time, a.status, a.createdAt);
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
  if (store.agents.length > 0) return;
  const helper: Agent = { id: nextId('ag'), name: 'Helper-1', model: 'muse-spark', createdAt: SEED_STAMP };
  const clerk: Agent = { id: nextId('ag'), name: 'Clerk-2', model: 'support-9', createdAt: SEED_STAMP };
  const scout: Agent = { id: nextId('ag'), name: 'Scout-3', model: 'explorer-mini', createdAt: SEED_STAMP };
  insertAgent(helper);
  insertAgent(clerk);
  insertAgent(scout);
  const quiet: Therapy = { id: nextId('th'), name: 'Quiet room', description: 'An hour with no pings', createdAt: SEED_STAMP };
  const mute: Therapy = { id: nextId('th'), name: 'Mute button', description: 'Silence non-urgent alerts', createdAt: SEED_STAMP };
  const fresh: Therapy = { id: nextId('th'), name: 'Fresh context', description: 'Compact and restart clean', createdAt: SEED_STAMP };
  insertTherapy(quiet);
  insertTherapy(mute);
  insertTherapy(fresh);
  const fatigue: Ailment = { id: nextId('ai'), agentId: helper.id, name: 'Prompt fatigue', notes: 'Too many rewrites', therapyId: quiet.id, createdAt: SEED_STAMP };
  const overload: Ailment = { id: nextId('ai'), agentId: clerk.id, name: 'Alert overload', therapyId: mute.id, createdAt: SEED_STAMP };
  const rot: Ailment = { id: nextId('ai'), agentId: helper.id, name: 'Context rot', createdAt: SEED_STAMP };
  insertAilment(fatigue);
  insertAilment(overload);
  insertAilment(rot);
  insertAppointment({ id: nextId('ap'), agentId: helper.id, ailmentId: fatigue.id, therapyId: quiet.id, time: '2026-10-01T10:00:00Z', status: 'scheduled', createdAt: SEED_STAMP });
  insertAppointment({ id: nextId('ap'), agentId: clerk.id, ailmentId: overload.id, therapyId: mute.id, time: '2026-10-03T14:30:00Z', status: 'scheduled', createdAt: SEED_STAMP });
}
