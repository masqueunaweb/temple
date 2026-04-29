'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80',
    alt: 'Atardecer sobre el mar',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    alt: 'Olas del mar',
  },
  {
    url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=80',
    alt: 'Arquitectura minimalista',
  },
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80',
    alt: 'Águila - perseverancia',
  },
  {
    url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1920&q=80',
    alt: 'Lobo - lealtad',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
    alt: 'Naturaleza silenciosa',
  },
];

export default function HorizontalImageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: () => -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth - windowWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-temple-bg">
      <div ref={scrollRef} className="flex h-full">
        {IMAGES.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full relative"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-satoshi text-display font-bold tracking-tight text-temple-text-primary opacity-60">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
