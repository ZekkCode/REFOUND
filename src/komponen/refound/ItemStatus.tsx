import React from 'react';
import LencanaStatus from '../LencanaStatus';
import { StatusLaporan } from '@/pustaka/alur-kerja/tipe';

interface ItemStatusProps {
  tipe: 'kehilangan' | 'penemuan';
  statusLaporan: StatusLaporan;
}

export default function ItemStatus({ tipe, statusLaporan }: ItemStatusProps) {
  return <LencanaStatus tipe={tipe} statusLaporan={statusLaporan} />;
}
