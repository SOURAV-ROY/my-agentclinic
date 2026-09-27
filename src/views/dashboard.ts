import { store } from '../models';
import type { Appointment } from '../models';
import { escapeHtml } from './escape';

export function upcomingAppointments(): Appointment[] {
  return store.appointments
    .filter((a) => a.status === 'scheduled')
    .sort((x, y) => x.time.localeCompare(y.time));
}

function agentName(id: string): string {
  return store.agents.find((a) => a.id === id)?.name ?? id;
}

export function renderDashboard(): string {
  const agents =
    store.agents
      .map((a) => `<li><a href="/agents/${a.id}">${escapeHtml(a.name)}</a></li>`)
      .join('') || '<li>No agents yet — <a href="/agents">onboard one</a>.</li>';
  const ailments =
    store.ailments
      .map((a) => `<li><a href="/ailments/${a.id}">${escapeHtml(a.name)}</a> (${escapeHtml(agentName(a.agentId))})</li>`)
      .join('') || '<li>No ailments recorded.</li>';
  const therapies =
    store.therapies
      .map((t) => `<li><a href="/therapies/${t.id}">${escapeHtml(t.name)}</a></li>`)
      .join('') || '<li>No therapies yet.</li>';
  const upcoming = upcomingAppointments();
  const upcomingItems =
    upcoming
      .map(
        (a) =>
          `<li><a href="/appointments#${a.id}">${escapeHtml(agentName(a.agentId))} — ${escapeHtml(a.time)}</a></li>`,
      )
      .join('') || '<li>No upcoming appointments.</li>';

  return `<main><h2>Dashboard</h2><p>Relief for AI agents, at a glance.</p>
<section><h3>Agents (${store.agents.length})</h3><ul>${agents}</ul></section>
<section><h3>Ailments (${store.ailments.length})</h3><ul>${ailments}</ul></section>
<section><h3>Therapies (${store.therapies.length})</h3><ul>${therapies}</ul></section>
<section><h3>Upcoming appointments (${upcoming.length})</h3><ul>${upcomingItems}</ul><p><a href="/appointments">Book appointment</a></p></section>
</main>`;
}
