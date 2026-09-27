import { store } from '../models';
import type { Appointment } from '../models';
import { escapeHtml } from './escape';

function agentName(id: string): string {
  return store.agents.find((a) => a.id === id)?.name ?? id;
}

function optionList(items: { id: string; name: string }[]): string {
  return items.map((i) => `<option value="${i.id}">${escapeHtml(i.name)}</option>`).join('');
}

function appointmentItem(a: Appointment): string {
  const state = a.status === 'cancelled' ? ' (cancelled)' : '';
  return `<li id="${a.id}">${escapeHtml(agentName(a.agentId))} — ${escapeHtml(a.time)}${state} <a href="/appointments#${a.id}">view</a></li>`;
}

export function renderAppointmentList(): string {
  const scheduled = store.appointments.filter((a) => a.status === 'scheduled');
  const cancelled = store.appointments.filter((a) => a.status === 'cancelled');
  return `<main><h2>Appointments</h2>
<h3>Scheduled (${scheduled.length})</h3><ul>${scheduled.map(appointmentItem).join('') || '<li>None.</li>'}</ul>
<h3>Cancelled (${cancelled.length})</h3><ul>${cancelled.map(appointmentItem).join('') || '<li>None.</li>'}</ul>
<h3>Book appointment</h3>
<form method="post" action="/appointments">
<label>Agent <select name="agentId" required>${optionList(store.agents)}</select></label>
<label>Ailment <select name="ailmentId">${optionList(store.ailments)}</select></label>
<label>Therapy <select name="therapyId">${optionList(store.therapies)}</select></label>
<label>Time <input name="time" placeholder="2026-10-01T10:00" required /></label>
<button type="submit">Book</button></form>
</main>`;
}
