'use client';

import { useRef, useEffect, useState } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - rect.top;
      
      // Calcular blur basado en distancia del footer
      const maxBlur = 20;
      const blur = Math.min(maxBlur, Math.max(0, distanceFromBottom / 50));
      setBlurAmount(blur);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-12 border-t border-temple-border mt-24"
      style={{
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary">
            TEMPLE
          </p>
          <p className="font-satoshi text-body text-temple-text-tertiary">
            27 días. Constancia silenciosa.
          </p>
          <p className="font-jetbrains text-mono text-temple-text-tertiary text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
