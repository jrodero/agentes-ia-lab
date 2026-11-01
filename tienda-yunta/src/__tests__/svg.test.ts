import { describe, expect, it } from 'vitest';
import { garmentSvg } from '../components/garmentSvg';
import { escapeXml } from '../lib/format';

describe('imágenes SVG de prenda', () => {
  it('escapa el texto del cliente para evitar inyección', () => {
    const svg = garmentSvg({ garment: 'tee', color: 'hueso', design: 'texto', text: '<script>x</script>', placement: 'pecho', view: 'front' });
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
    expect(escapeXml(`"'&`)).toBe('&quot;&#39;&amp;');
  });
  it('solo dibuja el diseño en la cara correspondiente', () => {
    const back = garmentSvg({ garment: 'over', color: 'salvia', design: 'paseo', text: '', placement: 'espalda', view: 'back' });
    const front = garmentSvg({ garment: 'over', color: 'salvia', design: 'paseo', text: '', placement: 'espalda', view: 'front' });
    expect(back).toContain('paseo de domingo');
    expect(front).not.toContain('paseo de domingo');
  });
});
