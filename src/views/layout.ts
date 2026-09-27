import { renderHeader } from './header';
import { renderMain } from './main';
import { renderFooter } from './footer';

export type LayoutProps = {
  title?: string;
  body?: string;
};

export function renderLayout(props: LayoutProps = {}): string {
  const { title = 'AgentClinic', body } = props;
  const main = body ?? renderMain();
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
${main}
${renderFooter()}
</body>
</html>`;
}
