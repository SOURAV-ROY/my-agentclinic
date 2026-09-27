import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

export function defaultMigrationsDir(): string {
  const override = process.env.AGENTCLINIC_MIGRATIONS;
  if (override && override.length > 0) return override;
  return path.join(__dirname, '..', 'data', 'migrations');
}

export function listMigrationFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    throw new Error(`Migrations directory not found: ${dir}`);
  }
  return entries.filter((f) => f.endsWith('.sql')).sort();
}

export function applyMigrations(db: DatabaseSync, migrationsDir?: string): string[] {
  const dir = migrationsDir ?? defaultMigrationsDir();
  const files = listMigrationFiles(dir);
  db.exec(
    'CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, appliedAt TEXT NOT NULL);',
  );
  const appliedRows = db.prepare('SELECT version FROM schema_migrations').all() as Array<{
    version: unknown;
  }>;
  const applied = new Set(appliedRows.map((r) => String(r.version)));
  const newlyApplied: string[] = [];
  for (const file of files) {
    if (applied.has(file)) continue;
    const fullPath = path.join(dir, file);
    const sql = fs.readFileSync(fullPath, 'utf8');
    try {
      db.exec(sql);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Migration ${file} failed: ${msg}`);
    }
    db.prepare('INSERT INTO schema_migrations (version, appliedAt) VALUES (?, ?)').run(
      file,
      new Date().toISOString(),
    );
    newlyApplied.push(file);
  }
  return newlyApplied;
}
