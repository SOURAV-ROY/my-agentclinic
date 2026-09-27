CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT,
  createdAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS ailments (
  id TEXT PRIMARY KEY,
  agentId TEXT NOT NULL,
  name TEXT NOT NULL,
  notes TEXT,
  therapyId TEXT,
  createdAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS therapies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  createdAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  agentId TEXT NOT NULL,
  ailmentId TEXT,
  therapyId TEXT,
  time TEXT NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
