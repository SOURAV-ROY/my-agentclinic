import { describe, it, expect } from 'vitest';
import { renderHeader } from './header';
import { renderMain } from './main';
import { renderFooter } from './footer';
import { renderLayout } from './layout';

describe('layout subcomponents', () => {
  it('header/main/footer render expected tags', () => {
    expect(renderHeader()).toContain('<header>');
    expect(renderMain()).toContain('<main>');
    expect(renderFooter()).toContain('<footer>');
  });

  it('layout composes all three + CSS link', () => {
    const html = renderLayout();
    expect(html).toContain('<header>');
    expect(html).toContain('<main>');
    expect(html).toContain('<footer>');
    expect(html).toContain('/styles.css');
    expect(html).toContain('AgentClinic');
  });
});
