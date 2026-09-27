import { store } from '../models';
import type { Ailment, Therapy } from '../models';
import { escapeHtml } from './escape';

function agentName(id: string): string {
  return store.agents.find((a) => a.id === id)?.name ?? id;
}

function therapyName(id: string | undefined): string {
  if (!id) return 'none';
  return store.therapies.find((t) => t.id === id)?.name ?? id;
}

export function renderAilmentList(): string {
  const items =
    store.ailments
      .map(
        (a) =>
          `<li><a href="/ailments/${a.id}">${escapeHtml(a.name)}</a> (${escapeHtml(agentName(a.agentId))})</li>`,
      )
      .join('') || '<li>No ailments recorded.</li>';
  const agentOptions = store.agents
    .map((a) => `<option value="${a.id}">${escapeHtml(a.name)}</option>`)
    .join('');
  return `<main><h2>Ailments</h2><ul>${items}</ul>
<h3>Record ailment</h3>
<form method="post" action="/ailments"><label>Agent <select name="agentId" required>${agentOptions}</select></label><label>Name <input name="name" required /></label><label>Notes <input name="notes" /></label><button type="submit">Add ailment</button></form>
</main>`;
}

export function renderAilmentDetail(ailment: Ailment, therapies: Therapy[]): string {
  const options = therapies
    .map(
      (t) =>
        `<option value="${t.id}"${t.id === ailment.therapyId ? ' selected' : ''}>${escapeHtml(t.name)}</option>`,
    )
    .join('');
  return `<main><h2>${escapeHtml(ailment.name)}</h2>
<p>Agent: ${escapeHtml(agentName(ailment.agentId))} — therapy: ${escapeHtml(therapyName(ailment.therapyId))}</p>
${ailment.notes ? `<p>Notes: ${escapeHtml(ailment.notes)}</p>` : ''}
<h3>Edit ailment</h3>
<form method="post" action="/ailments/${ailment.id}/edit"><label>Name <input name="name" value="${escapeHtml(ailment.name)}" required /></label><label>Notes <input name="notes" value="${escapeHtml(ailment.notes ?? '')}" /></label><button type="submit">Save</button></form>
<h3>Assign therapy</h3>
<form method="post" action="/ailments/${ailment.id}/assign"><label>Therapy <select name="therapyId" required>${options}</select></label><button type="submit">Assign</button></form>
</main>`;
}
