import { renderHeader } from './header';
import { renderMain } from './main';
import { renderFooter } from './footer';

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
