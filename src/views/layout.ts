import { renderHeader } from './header';
import { renderMain } from './main';
import { renderFooter } from './footer';

export type LayoutProps = {
  title?: string;
};

export function renderLayout(props: LayoutProps = {}): string {
  const { title = 'AgentClinic' } = props;
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
