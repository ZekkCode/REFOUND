'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function InisialisasiAOS({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
    });
  }, []);

  return <>{children}</>;
}
