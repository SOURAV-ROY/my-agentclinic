import { store } from '../models';
import type { Agent, Ailment } from '../models';
import { escapeHtml } from './escape';

export function renderAgentList(): string {
  const items =
    store.agents
      .map(
        (a) =>
          `<li><a href="/agents/${a.id}">${escapeHtml(a.name)}</a>${a.model ? ` (${escapeHtml(a.model)})` : ''}</li>`,
      )
      .join('') || '<li>No agents yet.</li>';
  return `<main><h2>Agents</h2><ul>${items}</ul>
<h3>Onboard agent</h3>
<form method="post" action="/agents"><label>Name <input name="name" required /></label><label>Model <input name="model" /></label><button type="submit">Add agent</button></form>
</main>`;
}

export function renderAgentDetail(agent: Agent, ailments: Ailment[]): string {
  const ailmentItems =
    ailments
      .map((a) => `<li><a href="/ailments/${a.id}">${escapeHtml(a.name)}</a></li>`)
      .join('') || '<li>No ailments recorded for this agent.</li>';
  return `<main><h2>${escapeHtml(agent.name)}</h2>
<p>Model: ${escapeHtml(agent.model ?? 'unknown')} — onboarded ${escapeHtml(agent.createdAt)}</p>
<h3>Ailments</h3><ul>${ailmentItems}</ul><p><a href="/ailments">Record ailment</a></p>
<h3>Edit agent</h3>
<form method="post" action="/agents/${agent.id}/edit"><label>Name <input name="name" value="${escapeHtml(agent.name)}" required /></label><label>Model <input name="model" value="${escapeHtml(agent.model ?? '')}" /></label><button type="submit">Save</button></form>
</main>`;
}
