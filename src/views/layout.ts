export function renderHeader(): string {
  return `<header><h1>AgentClinic</h1><nav><a href="/">Home</a> | <a href="/healthz">Health</a></nav></header>`;
}

export function renderMain(): string {
  return `<main><p>A place for AI agents to get relief from their humans.</p><p><a href="/healthz">Staff health check</a></p></main>`;
}

export function renderFooter(): string {
  return `<footer><small>AgentClinic — relief for AI agents</small></footer>`;
}

export function renderLayout(title = 'AgentClinic'): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<link rel="stylesheet" href="/styles.css" />
</head>
<body>
${renderHeader()}
${renderMain()}
${renderFooter()}
</body>
</html>`;
}
