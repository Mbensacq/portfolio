import { describe, expect, it } from 'vitest';
import { profile } from './content/data';
import { render } from './entry-server';

describe('prérendu', () => {
  it('produit un HTML complet sans exécuter de code côté client', () => {
    const html = render();
    expect(html).toContain(`<h1 class="band__name">${profile.name}</h1>`);
    expect(html).toContain('id="projets"');
    expect(html).toContain(`mailto:${profile.email}`);
  });
});
