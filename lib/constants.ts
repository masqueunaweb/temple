import { Dimension } from './types';

export const DIMENSIONS = [
  {
    id: 'interior' as Dimension,
    num: '01',
    name: 'INTERIOR',
    desc: 'Lo que pasa dentro cuando nadie mira. Pensamiento, emociones, claridad mental.',
  },
  {
    id: 'maquina' as Dimension,
    num: '02',
    name: 'MÁQUINA',
    desc: 'Tu cuerpo es la herramienta. Trátala como si todo dependiera de ella — porque depende.',
  },
  {
    id: 'trinchera' as Dimension,
    num: '03',
    name: 'TRINCHERA',
    desc: 'El trabajo serio en silencio. Foco, productividad, deep work.',
  },
  {
    id: 'afilado' as Dimension,
    num: '04',
    name: 'AFILADO',
    desc: 'Seguir aprendiendo es la única ventaja que no se puede copiar.',
  },
  {
    id: 'tribu' as Dimension,
    num: '05',
    name: 'TRIBU',
    desc: 'No red. No networking. Las personas que te hacen mejor con solo estar cerca.',
  },
] as const;
