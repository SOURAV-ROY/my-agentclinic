import { store } from '../models';
import type { Therapy } from '../models';
import { escapeHtml } from './escape';

export function renderTherapyList(): string {
  const items =
    store.therapies
      .map((t) => `<li><a href="/therapies/${t.id}">${escapeHtml(t.name)}</a></li>`)
      .join('') || '<li>No therapies yet.</li>';
  return `<main><h2>Therapies</h2><ul>${items}</ul>
<h3>Add therapy</h3>
<form method="post" action="/therapies"><label>Name <input name="name" required /></label><label>Description <input name="description" /></label><button type="submit">Add therapy</button></form>
</main>`;
}

export function renderTherapyDetail(therapy: Therapy): string {
  const mentions = store.ailments.filter((a) => a.therapyId === therapy.id);
  const items =
    mentions
      .map((a) => `<li><a href="/ailments/${a.id}">${escapeHtml(a.name)}</a></li>`)
      .join('') || '<li>No ailments assigned yet.</li>';
  return `<main><h2>${escapeHtml(therapy.name)}</h2>
${therapy.description ? `<p>${escapeHtml(therapy.description)}</p>` : ''}
<h3>Assigned ailments</h3><ul>${items}</ul>
<h3>Edit therapy</h3>
<form method="post" action="/therapies/${therapy.id}/edit"><label>Name <input name="name" value="${escapeHtml(therapy.name)}" required /></label><label>Description <input name="description" value="${escapeHtml(therapy.description ?? '')}" /></label><button type="submit">Save</button></form>
</main>`;
}
