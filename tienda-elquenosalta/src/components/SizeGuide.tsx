import { useEffect, useRef } from 'react';
import { GARMENT_NAMES, SIZE_GUIDE } from '../data/catalog';
import type { Garment } from '../lib/types';

export function SizeTable({ garment }: { garment: Garment }) {
  return (
    <table className="table">
      <caption>{GARMENT_NAMES[garment]} · medidas de la prenda en plano (cm)</caption>
      <thead><tr><th>Talla</th><th>Ancho (axila a axila)</th><th>Largo</th></tr></thead>
      <tbody>
        {SIZE_GUIDE[garment].map((r) => (
          <tr key={r.size}><td>{r.size}</td><td>{r.ancho}</td><td>{r.largo}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export function SizeGuideDialog({ garment, open, onClose }: { garment: Garment; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="dialog" onClose={onClose} aria-labelledby="sg-title">
      <h2 id="sg-title">Guía de tallas</h2>
      <p>Mide una camiseta tuya que te quede bien, estirada sobre una mesa, y compárala con la tabla.</p>
      <SizeTable garment={garment} />
      <p className="note">Medidas orientativas (±2 cm). Se confirmarán con la ficha técnica de cada proveedor.</p>
      <button className="btn" onClick={onClose}>Cerrar</button>
    </dialog>
  );
}
