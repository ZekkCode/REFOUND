import React from 'react';
import TabelAntreanAdmin from '../TabelAntreanAdmin';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

interface AdminQueueProps {
  queueItems: ItemLaporan[];
  onSelect?: (item: ItemLaporan) => void;
}

export default function AdminQueue({ queueItems, onSelect }: AdminQueueProps) {
  return <TabelAntreanAdmin daftarLaporan={queueItems} onPilihLaporan={onSelect} />;
}
