import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { applyMigrations, defaultMigrationsDir, listMigrationFiles } from './migrate';
import { resetStore, seedStore, store } from './models';

function tableNames(db: DatabaseSync): string[] {
  const rows = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
    .all() as Array<{ name: unknown }>;
  return rows.map((r) => String(r.name));
}

function appliedVersions(db: DatabaseSync): string[] {
  const rows = db
    .prepare('SELECT version FROM schema_migrations ORDER BY version')
    .all() as Array<{ version: unknown }>;
  return rows.map((r) => String(r.version));
}

beforeEach(() => resetStore());

describe('migrations', () => {
  it('applies baseline to fresh :memory: creating all tables + tracking', () => {
    const db = new DatabaseSync(':memory:');
    try {
      const applied = applyMigrations(db, defaultMigrationsDir());
      expect(applied).toContain('001-baseline-schema.sql');
      const tables = tableNames(db);
      expect(tables).toContain('agents');
      expect(tables).toContain('ailments');
      expect(tables).toContain('therapies');
      expect(tables).toContain('appointments');
      expect(tables).toContain('schema_migrations');
      expect(appliedVersions(db)).toContain('001-baseline-schema.sql');
    } finally {
      db.close();
    }
  });

  it('rerun is idempotent with no new versions', () => {
    const db = new DatabaseSync(':memory:');
    try {
      const first = applyMigrations(db, defaultMigrationsDir());
      expect(first.length).toBeGreaterThan(0);
      const before = appliedVersions(db);
      const second = applyMigrations(db, defaultMigrationsDir());
      expect(second).toEqual([]);
      expect(appliedVersions(db)).toEqual(before);
    } finally {
      db.close();
    }
  });

  it('applies files in sorted order', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migrate-order-'));
    try {
      fs.writeFileSync(path.join(dir, '002-b.sql'), 'CREATE TABLE b (id TEXT PRIMARY KEY);\n');
      fs.writeFileSync(path.join(dir, '001-a.sql'), 'CREATE TABLE a (id TEXT PRIMARY KEY);\n');
      fs.writeFileSync(path.join(dir, '010-c.sql'), 'CREATE TABLE c (id TEXT PRIMARY KEY);\n');
      expect(listMigrationFiles(dir)).toEqual(['001-a.sql', '002-b.sql', '010-c.sql']);
      const db = new DatabaseSync(':memory:');
      try {
        const applied = applyMigrations(db, dir);
        expect(applied).toEqual(['001-a.sql', '002-b.sql', '010-c.sql']);
        const tables = tableNames(db);
        expect(tables).toContain('a');
        expect(tables).toContain('b');
        expect(tables).toContain('c');
      } finally {
        db.close();
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('bad SQL aborts with clear error and records nothing for that version', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migrate-bad-'));
    try {
      fs.writeFileSync(path.join(dir, '001-good.sql'), 'CREATE TABLE good (id TEXT PRIMARY KEY);\n');
      fs.writeFileSync(path.join(dir, '002-bad.sql'), 'THIS IS NOT VALID SQL;\n');
      const db = new DatabaseSync(':memory:');
      try {
        expect(() => applyMigrations(db, dir)).toThrow(/Migration 002-bad\.sql failed/);
        expect(appliedVersions(db)).toEqual(['001-good.sql']);
        expect(tableNames(db)).toContain('good');
      } finally {
        db.close();
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('missing directory fails loudly with path', () => {
    const missing = path.join(os.tmpdir(), `definitely-missing-${Date.now()}`);
    const db = new DatabaseSync(':memory:');
    try {
      expect(() => applyMigrations(db, missing)).toThrow(/Migrations directory not found/);
      expect(() => applyMigrations(db, missing)).toThrow(missing);
    } finally {
      db.close();
    }
  });

  it('temp file DB retains data across reopens with idempotent rerun', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migrate-persist-'));
    const file = path.join(dir, 'test.db');
    try {
      const db1 = new DatabaseSync(file);
      try {
        applyMigrations(db1, defaultMigrationsDir());
        db1
          .prepare("INSERT INTO agents (id, name, model, createdAt) VALUES (?, ?, ?, ?)")
          .run('ag-1', 'Persist-1', null, new Date().toISOString());
      } finally {
        db1.close();
      }
      const db2 = new DatabaseSync(file);
      try {
        const second = applyMigrations(db2, defaultMigrationsDir());
        expect(second).toEqual([]);
        const rows = db2.prepare('SELECT id FROM agents').all() as Array<{ id: unknown }>;
        expect(rows.map((r) => String(r.id))).toContain('ag-1');
      } finally {
        db2.close();
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('models :memory: boot migrates then seeds MVP fixtures', () => {
    seedStore();
    expect(store.agents.map((a) => a.name)).toContain('Helper-1');
    expect(store.therapies.map((t) => t.name)).toContain('Quiet room');
    expect(store.ailments.map((a) => a.name)).toContain('Prompt fatigue');
    expect(store.appointments.length).toBe(2);
  });

  it('defaultMigrationsDir respects AGENTCLINIC_MIGRATIONS override', () => {
    const prev = process.env.AGENTCLINIC_MIGRATIONS;
    process.env.AGENTCLINIC_MIGRATIONS = '/tmp/custom-migrations';
    try {
      expect(defaultMigrationsDir()).toBe('/tmp/custom-migrations');
    } finally {
      if (prev === undefined) delete process.env.AGENTCLINIC_MIGRATIONS;
      else process.env.AGENTCLINIC_MIGRATIONS = prev;
    }
  });
});
